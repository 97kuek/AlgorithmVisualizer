// js/viterbi.js

/**
 * Viterbi のステップを生成
 * @param {string[]} states
 * @param {string[]} observations
 * @param {number[]} pi
 * @param {number[][]} A
 * @param {number[][]} B
 * @returns {Object} { steps: Array, deltaMatrix: Array, psiMatrix: Array }
 */
function generateViterbiSteps(states, observations, pi, A, B) {
  const N = states.length;
  const T = observations.length;
  const obsIndex = {};
  observations.forEach((o, idx) => (obsIndex[o] = idx));

  // δ(t,i), ψ(t,i)
  const delta = Array.from({ length: T }, () => new Array(N).fill(0));
  const psi   = Array.from({ length: T }, () => new Array(N).fill(0));
  const steps = [];

  // t=0 初期化
  const o0 = observations[0];
  for (let i = 0; i < N; i++) {
    delta[0][i] = pi[i] * B[i][obsIndex[o0]];
    psi[0][i] = 0;
    steps.push({
      type: 'cell',
      t: 0,
      i: i,
      value: delta[0][i].toFixed(5),
      message:
        `初期化 (t=0) 状態=${states[i]}: δ[0][${i}] = π[${i}] × b[${i}][${o0}] = ${pi[i]} × ${B[i][obsIndex[o0]]} = ${delta[0][i].toFixed(5)}`
    });
  }

  // t=1..T-1
  for (let t = 1; t < T; t++) {
    const ot = observations[t];
    for (let j = 0; j < N; j++) {
      let maxVal = -1, maxState = 0;
      for (let i = 0; i < N; i++) {
        const val = delta[t - 1][i] * A[i][j];
        steps.push({
          type: 'compare',
          t: t,
          from: i,
          to: j,
          message:
            `t=${t} 比較: δ[${t - 1}][${i}] (${delta[t - 1][i].toFixed(5)}) × a[${i}→${j}] (${A[i][j]}) = ${val.toFixed(5)}`
        });
        if (val > maxVal) {
          maxVal = val;
          maxState = i;
        }
      }
      delta[t][j] = maxVal * B[j][obsIndex[ot]];
      psi[t][j] = maxState;
      steps.push({
        type: 'cell',
        t: t,
        i: j,
        value: delta[t][j].toFixed(5),
        message:
          `t=${t} 状態=${states[j]}:\n` +
          `最大転移 from=${states[maxState]} (${maxVal.toFixed(5)})\n` +
          `出力確率 b[${j}][${ot}] = ${B[j][obsIndex[ot]]}\n` +
          `→ δ[${t}][${j}] = ${(maxVal).toFixed(5)} × ${B[j][obsIndex[ot]]} = ${delta[t][j].toFixed(5)}`
      });
    }
  }

  // 最終ステップ: 終端状態を決定
  let finalMax = -1, finalState = 0;
  for (let i = 0; i < N; i++) {
    if (delta[T - 1][i] > finalMax) {
      finalMax = delta[T - 1][i];
      finalState = i;
    }
  }
  steps.push({
    type: 'end',
    message: `計算完了！ 最尤終端は状態=${states[finalState]} (確率=${finalMax.toFixed(5)}) です。`
  });
  return { steps: steps, deltaMatrix: delta, psiMatrix: psi };
}

// 「Initialize」ボタン押下時 (Viterbi 用)
vitInitBtn.addEventListener('click', () => {
  // 1) 入力パース
  const states = vitStatesInput.value.trim().split(',').map(s => s.trim()).filter(s => s);
  const obsSeq = vitObsInput.value.trim().split(',').map(s => s.trim()).filter(s => s);
  const piVals = vitPiInput.value.trim().split(',').map(s => parseFloat(s.trim()));
  const Arows  = vitAInput.value.trim().split('\n').map(line =>
    line.trim().split(',').map(x => parseFloat(x.trim()))
  );
  const Brows  = vitBInput.value.trim().split('\n').map(line =>
    line.trim().split(',').map(x => parseFloat(x.trim()))
  );

  // 2) 入力チェック
  if (
    states.length === 0 || obsSeq.length === 0 ||
    piVals.length !== states.length ||
    Arows.length !== states.length ||
    Brows.length !== states.length
  ) {
    alert('入力形式エラー：状態数・観測系列・π・A・B を正しく入力してください。');
    return;
  }

  clearAutoPlay();
  const result = generateViterbiSteps(states, obsSeq, piVals, Arows, Brows);
  viterbiSteps = result.steps;
  currentIndex = 0;

  // テーブル再構築 (行:状態, 列:t=0..T-1)
  while (vitTable.firstChild) vitTable.firstChild.remove();
  const N = states.length, T = obsSeq.length;

  // ヘッダー
  const thead = document.createElement('thead');
  const trH = document.createElement('tr');
  trH.appendChild(document.createElement('th'));
  for (let t = 0; t < T; t++) {
    const th = document.createElement('th');
    th.textContent = `t=${t}`;
    th.classList.add('trellis-header');
    trH.appendChild(th);
  }
  thead.appendChild(trH);
  vitTable.appendChild(thead);

  // 本体
  const tbody = document.createElement('tbody');
  for (let i = 0; i < N; i++) {
    const tr = document.createElement('tr');
    const thState = document.createElement('th');
    thState.textContent = states[i];
    tr.appendChild(thState);
    for (let t = 0; t < T; t++) {
      const td = document.createElement('td');
      td.id = `vit-cell-${t}-${i}`;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  vitTable.appendChild(tbody);

  renderStep();
});

// 「ランダム生成」ボタン押下時 (Viterbi 用)
vitRandomBtn.addEventListener('click', () => {
  // N=2..4, T=3..6
  const N = Math.floor(Math.random() * 3) + 2;
  const T = Math.floor(Math.random() * 4) + 3;

  // 状態名
  const states = [];
  for (let i = 0; i < N; i++) states.push(`S${i}`);
  vitStatesInput.value = states.join(',');

  // 観測系列
  const obsSeq = [];
  for (let t = 0; t < T; t++) obsSeq.push(`o${t}`);
  vitObsInput.value = obsSeq.join(',');

  // π
  let sumPi = 0;
  const piArr = [];
  for (let i = 0; i < N; i++) {
    const v = Math.random();
    piArr.push(v);
    sumPi += v;
  }
  for (let i = 0; i < N; i++) piArr[i] = (piArr[i] / sumPi).toFixed(3);
  vitPiInput.value = piArr.join(',');

  // A: N×N 正規化ランダム
  const Arows = [];
  for (let i = 0; i < N; i++) {
    let rowSum = 0;
    const row = [];
    for (let j = 0; j < N; j++) {
      const v = Math.random();
      row.push(v);
      rowSum += v;
    }
    for (let j = 0; j < N; j++) row[j] = (row[j] / rowSum).toFixed(3);
    Arows.push(row);
  }
  vitAInput.value = Arows.map(r => r.join(',')).join('\n');

  // B: N×T 正規化ランダム
  const BrowsArr = [];
  for (let i = 0; i < N; i++) {
    let rowSum = 0;
    const row = [];
    for (let t = 0; t < T; t++) {
      const v = Math.random();
      row.push(v);
      rowSum += v;
    }
    for (let t = 0; t < T; t++) row[t] = (row[t] / rowSum).toFixed(3);
    BrowsArr.push(row);
  }
  vitBInput.value = BrowsArr.map(r => r.join(',')).join('\n');
});
