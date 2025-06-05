// js/forward.js

/**
 * Forward 用のステップを生成
 * @param {string[]} states
 * @param {string[]} observations
 * @param {number[]} pi
 * @param {number[][]} A
 * @param {number[][]} B
 * @returns {Array} ステップリスト
 */
function generateForwardSteps(states, observations, pi, A, B) {
  const N = states.length;
  const T = observations.length;
  const obsIndex = {};
  observations.forEach((o, idx) => {
    obsIndex[o] = idx;
  });

  // トレリス行列 α[t][i]
  const alpha = Array.from({ length: T }, () => new Array(N).fill(0));
  const steps = [];

  // t=0 の初期化
  const o0 = observations[0];
  for (let i = 0; i < N; i++) {
    alpha[0][i] = pi[i] * B[i][obsIndex[o0]];
    steps.push({
      type: 'cell',
      t: 0,
      i: i,
      value: alpha[0][i].toFixed(5),
      message: 
        `初期化 (t=0) 状態=${states[i]}: α[0][${i}] = π[${i}] × b[${i}][${o0}] = ${pi[i]} × ${B[i][obsIndex[o0]]} = ${alpha[0][i].toFixed(5)}`
    });
  }

  // t=1..T-1
  for (let t = 1; t < T; t++) {
    const ot = observations[t];
    for (let j = 0; j < N; j++) {
      let sumPrev = 0;
      for (let i = 0; i < N; i++) {
        sumPrev += alpha[t - 1][i] * A[i][j];
      }
      const val = sumPrev * B[j][obsIndex[ot]];
      alpha[t][j] = val;
      steps.push({
        type: 'cell',
        t: t,
        i: j,
        value: val.toFixed(5),
        message:
          `t=${t}, 状態=${states[j]}:\n` +
          `前時刻 Σ_{i} α[${t - 1}][i]*a[i→${j}] = ${sumPrev.toFixed(5)}\n` +
          `出力確率 b[${j}][${ot}] = ${B[j][obsIndex[ot]]}\n` +
          `→ α[${t}][${j}] = ${sumPrev.toFixed(5)} × ${B[j][obsIndex[ot]]} = ${val.toFixed(5)}`
      });
    }
  }

  steps.push({
    type: 'end',
    message:
      `計算終了！ 観測系列全体の確率 (尤度) = Σ_{i=0..N-1} α[T-1][i] を計算してください。`
  });
  return steps;
}

// 「Initialize」ボタン押下時 (Forward 用)
fwdInitBtn.addEventListener('click', () => {
  // 1) 入力をパース
  const states = fwdStatesInput.value.trim().split(',').map(s => s.trim()).filter(s => s);
  const obsSeq = fwdObsInput.value.trim().split(',').map(s => s.trim()).filter(s => s);
  const piVals = fwdPiInput.value.trim().split(',').map(s => parseFloat(s.trim()));
  const Arows  = fwdAInput.value.trim().split('\n').map(line =>
    line.trim().split(',').map(x => parseFloat(x.trim()))
  );
  const Brows  = fwdBInput.value.trim().split('\n').map(line =>
    line.trim().split(',').map(x => parseFloat(x.trim()))
  );

  // 2) 入力妥当性チェック
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
  forwardSteps = generateForwardSteps(states, obsSeq, piVals, Arows, Brows);
  currentIndex = 0;

  // テーブル再構築 (行:状態, 列:t=0..T-1)
  while (fwdTable.firstChild) fwdTable.firstChild.remove();
  const N = states.length, T = obsSeq.length;

  // ヘッダー行
  const thead = document.createElement('thead');
  const trH = document.createElement('tr');
  trH.appendChild(document.createElement('th')); // 左上空白
  for (let t = 0; t < T; t++) {
    const th = document.createElement('th');
    th.textContent = `t=${t}`;
    th.classList.add('trellis-header');
    trH.appendChild(th);
  }
  thead.appendChild(trH);
  fwdTable.appendChild(thead);

  // ボディ (各行に状態名とセル)
  const tbody = document.createElement('tbody');
  for (let i = 0; i < N; i++) {
    const tr = document.createElement('tr');
    const thState = document.createElement('th');
    thState.textContent = states[i];
    tr.appendChild(thState);
    for (let t = 0; t < T; t++) {
      const td = document.createElement('td');
      td.id = `fwd-cell-${t}-${i}`;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  fwdTable.appendChild(tbody);

  renderStep();
});

// 「ランダム生成」ボタン押下時 (Forward 用)
fwdRandomBtn.addEventListener('click', () => {
  // N=2..4, T=3..6
  const N = Math.floor(Math.random() * 3) + 2;
  const T = Math.floor(Math.random() * 4) + 3;

  // 状態名: S0,S1,...
  const states = [];
  for (let i = 0; i < N; i++) states.push(`S${i}`);
  fwdStatesInput.value = states.join(',');

  // 観測: o0,o1,...
  const obsSeq = [];
  for (let t = 0; t < T; t++) obsSeq.push(`o${t}`);
  fwdObsInput.value = obsSeq.join(',');

  // π: ランダムに生成して正規化
  let sumPi = 0;
  const piArr = [];
  for (let i = 0; i < N; i++) {
    const v = Math.random();
    piArr.push(v);
    sumPi += v;
  }
  for (let i = 0; i < N; i++) {
    piArr[i] = (piArr[i] / sumPi).toFixed(3);
  }
  fwdPiInput.value = piArr.join(',');

  // A: N×N 正規化付きランダム
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
  fwdAInput.value = Arows.map(r => r.join(',')).join('\n');

  // B: N×T 正規化付きランダム
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
  fwdBInput.value = BrowsArr.map(r => r.join(',')).join('\n');
});
