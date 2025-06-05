// -------------------------------------------------
// 共通ユーティリティ関数
// -------------------------------------------------

/** ms ミリ秒だけ待つ Promise を返す */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** 全てのステップ制御ボタンを disabled 化 */
function disableAllStepButtons() {
  [
    fwdPrevBtn, fwdNextBtn, fwdAutoBtn,
    vitPrevBtn, vitNextBtn, vitAutoBtn
  ].forEach(btn => {
    if (btn) btn.disabled = true;
  });
}

/** 各ステップ操作ボタンを有効／無効化 */
function updateStepButtons() {
  // Forward
  if (forwardControls.style.display === 'block' && forwardSteps.length > 0) {
    fwdPrevBtn.disabled = (currentIndex <= 0);
    fwdNextBtn.disabled = (currentIndex >= forwardSteps.length - 1);
    fwdAutoBtn.disabled = false;
  }
  // Viterbi
  if (viterbiControls.style.display === 'block' && viterbiSteps.length > 0) {
    vitPrevBtn.disabled = (currentIndex <= 0);
    vitNextBtn.disabled = (currentIndex >= viterbiSteps.length - 1);
    vitAutoBtn.disabled = false;
  }
}

/** 進捗テキストを更新 */
function updateProgress() {
  if (forwardControls.style.display === 'block') {
    const total = forwardSteps.length;
    const current = (currentIndex < 0) ? 0 : (currentIndex + 1);
    fwdProgress.textContent = `ステップ ${current} / ${total}`;
  }
  if (viterbiControls.style.display === 'block') {
    const total = viterbiSteps.length;
    const current = (currentIndex < 0) ? 0 : (currentIndex + 1);
    vitProgress.textContent = `ステップ ${current} / ${total}`;
  }
}

/** 自動再生タイマーをクリア */
function clearAutoPlay() {
  if (autoTimer !== null) {
    clearInterval(autoTimer);
    autoTimer = null;
  }
  // ボタンテキストを元に戻す
  [fwdAutoBtn, vitAutoBtn].forEach(btn => {
    if (btn) btn.textContent = 'Auto Play';
  });
}

/**
 * Auto Play をトグル（再生／一時停止）する
 * 「倍率」をもとに間隔 (ms) を算出： baseInterval (1000ms) ÷ 倍率
 */
function toggleAutoPlay() {
  let stepsArr, speedSelect, autoBtn;
  if (forwardControls.style.display === 'block') {
    stepsArr = forwardSteps;
    speedSelect = parseFloat(fwdSpeedSelect.value);
    autoBtn = fwdAutoBtn;
  } else if (viterbiControls.style.display === 'block') {
    stepsArr = viterbiSteps;
    speedSelect = parseFloat(vitSpeedSelect.value);
    autoBtn = vitAutoBtn;
  } else {
    return;
  }
  const interval = Math.floor(1000 / speedSelect);

  if (autoTimer === null) {
    // 再生開始
    autoBtn.textContent = 'Pause';
    autoTimer = setInterval(() => {
      if (currentIndex < stepsArr.length - 1) {
        currentIndex++;
        renderStep();
      } else {
        clearAutoPlay();
        updateStepButtons();
      }
    }, interval);
  } else {
    // 再生一時停止
    clearAutoPlay();
    updateStepButtons();
  }
}

/** 「前へ」クリック時 */
function onPrevStep() {
  if (currentIndex > 0) {
    currentIndex--;
    renderStep();
  }
}
/** 「次へ」クリック時 */
function onNextStep() {
  const stepsArr = (forwardControls.style.display === 'block') ? forwardSteps : viterbiSteps;
  if (currentIndex < stepsArr.length - 1) {
    currentIndex++;
    renderStep();
  }
}

// -------------------------------------------------
// 要素取得 (HTML 上の ID と紐付け)
// -------------------------------------------------

const algoSelect       = document.getElementById('algoSelect');

/** Forward アルゴリズム */
const forwardControls  = document.getElementById('forwardControls');
const fwdStatesInput   = document.getElementById('fwd_states');
const fwdObsInput      = document.getElementById('fwd_obs');
const fwdPiInput       = document.getElementById('fwd_pi');
const fwdAInput        = document.getElementById('fwd_A');
const fwdBInput        = document.getElementById('fwd_B');
const fwdInitBtn       = document.getElementById('fwdInitBtn');
const fwdRandomBtn     = document.getElementById('fwdRandomBtn');
const fwdTable         = document.getElementById('fwdTable');
const fwdPrevBtn       = document.getElementById('fwdPrevBtn');
const fwdNextBtn       = document.getElementById('fwdNextBtn');
const fwdAutoBtn       = document.getElementById('fwdAutoBtn');
const fwdSpeedSelect   = document.getElementById('fwdSpeedSelect');
const fwdProgress      = document.getElementById('fwdProgress');
const fwdDesc          = document.getElementById('fwdDesc');

/** Viterbi アルゴリズム */
const viterbiControls  = document.getElementById('viterbiControls');
const vitStatesInput   = document.getElementById('vit_states');
const vitObsInput      = document.getElementById('vit_obs');
const vitPiInput       = document.getElementById('vit_pi');
const vitAInput        = document.getElementById('vit_A');
const vitBInput        = document.getElementById('vit_B');
const vitInitBtn       = document.getElementById('vitInitBtn');
const vitRandomBtn     = document.getElementById('vitRandomBtn');
const vitTable         = document.getElementById('vitTable');
const vitPrevBtn       = document.getElementById('vitPrevBtn');
const vitNextBtn       = document.getElementById('vitNextBtn');
const vitAutoBtn       = document.getElementById('vitAutoBtn');
const vitSpeedSelect   = document.getElementById('vitSpeedSelect');
const vitProgress      = document.getElementById('vitProgress');
const vitDesc          = document.getElementById('vitDesc');

// -------------------------------------------------
// アルゴリズム用ステップ配列・現在インデックス・自動再生タイマー
// -------------------------------------------------
let forwardSteps = [], viterbiSteps = [];
let currentIndex = -1;
let autoTimer = null;

// -------------------------------------------------
// アルゴリズム選択時に各セクションを表示／非表示
// -------------------------------------------------
algoSelect.addEventListener('change', () => {
  const val = algoSelect.value;
  // 全部非表示
  [forwardControls, viterbiControls].forEach(div => {
    div.style.display = 'none';
  });
  clearAutoPlay();
  disableAllStepButtons();

  if (val === 'forward') {
    forwardControls.style.display = 'block';
  } else if (val === 'viterbi') {
    viterbiControls.style.display = 'block';
  }
});

// =================================================
// 5) Forward アルゴリズム可視化
// =================================================
/**
 * HMM 入力を解析し、Forward の計算ステップを生成する
 * @param {string[]} states        状態名リスト
 * @param {string[]} observations  観測系列リスト
 * @param {number[]} pi            初期確率配列
 * @param {number[][]} A           遷移確率行列
 * @param {number[][]} B           出力確率行列
 * @returns {Array} ステップ情報リスト
 */
function generateForwardSteps(states, observations, pi, A, B) {
  const N = states.length;
  const T = observations.length;
  const obsIndex = {};
  observations.forEach((o, idx) => (obsIndex[o] = idx));

  // α の行列をゼロで初期化
  const alpha = Array.from({ length: T }, () => new Array(N).fill(0));
  const steps = [];

  // --- t=0 の初期化 ---
  const o0 = observations[0];
  for (let i = 0; i < N; i++) {
    alpha[0][i] = pi[i] * B[i][obsIndex[o0]];
    steps.push({
      type: 'cell',
      t: 0,
      i: i,
      value: alpha[0][i].toFixed(4),
      message:
        `初期化 (t=0)：状態=${states[i]}\n` +
        `α[0][${i}] = π[${i}] × b[${i}][${o0}] = ${pi[i]} × ${B[i][obsIndex[o0]]} = ${alpha[0][i].toFixed(4)}`
    });
  }

  // --- t=1..T-1 ---
  for (let t = 1; t < T; t++) {
    const ot = observations[t];
    for (let j = 0; j < N; j++) {
      // まず前時間 t-1 の α から Σ を計算
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
        value: alpha[t][j].toFixed(4),
        message:
          `t=${t}：状態=${states[j]}\n` +
          `Σ_{i} α[${t - 1}][i] × a[i→${j}] = ${sumPrev.toFixed(4)}\n` +
          `出力確率 b[${j}][${ot}] = ${B[j][obsIndex[ot]]}\n` +
          `→ α[${t}][${j}] = ${sumPrev.toFixed(4)} × ${B[j][obsIndex[ot]]} = ${val.toFixed(4)}`
      });
    }
  }

  steps.push({
    type: 'end',
    message:
      `計算終了！最終的な観測系列の確率は Σ_{i} α[${T - 1}][i] を計算してください。`
  });
  return steps;
}

/** Forward Initialize をクリックしたとき */
fwdInitBtn.addEventListener('click', () => {
  // 1) 入力値を取得・パース
  const states = fwdStatesInput.value
    .trim()
    .split(',')
    .map(s => s.trim())
    .filter(s => s);
  const obsSeq = fwdObsInput.value
    .trim()
    .split(',')
    .map(s => s.trim())
    .filter(s => s);
  const piVals = fwdPiInput.value
    .trim()
    .split(',')
    .map(s => parseFloat(s.trim()));
  const Arows = fwdAInput.value
    .trim()
    .split('\n')
    .map(line =>
      line
        .trim()
        .split(',')
        .map(x => parseFloat(x.trim()))
    );
  const Brows = fwdBInput.value
    .trim()
    .split('\n')
    .map(line =>
      line
        .trim()
        .split(',')
        .map(x => parseFloat(x.trim()))
    );

  // 2) 入力検証
  if (
    states.length === 0 ||
    obsSeq.length === 0 ||
    piVals.length !== states.length ||
    Arows.length !== states.length ||
    Brows.length !== states.length
  ) {
    alert('入力形式エラー：状態数・観測系列・π・A・B を正しく入力してください。');
    return;
  }

  // 3) ステップ配列を生成
  clearAutoPlay();
  forwardSteps = generateForwardSteps(states, obsSeq, piVals, Arows, Brows);
  currentIndex = 0;

  // 4) テーブル（トレリス）を再構築
  while (fwdTable.firstChild) fwdTable.firstChild.remove();
  const N = states.length;
  const T = obsSeq.length;

  // ヘッダー行：左上は空白、その右に t=0..T-1
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

  // 本体：左端に状態名、右側に td
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

  // 5) 最初のステップを描画
  renderStep();
});

// ランダム生成（Forward）
fwdRandomBtn.addEventListener('click', () => {
  // 状態数 N=2～4, 観測系列長 T=3～6
  const N = Math.floor(Math.random() * 3) + 2;
  const T = Math.floor(Math.random() * 4) + 3;

  // 状態名は S0, S1, ...
  const states = [];
  for (let i = 0; i < N; i++) states.push(`S${i}`);
  fwdStatesInput.value = states.join(',');

  // 観測系列は o0, o1, ... o(T-1)
  const obsSeq = [];
  for (let t = 0; t < T; t++) obsSeq.push(`o${t}`);
  fwdObsInput.value = obsSeq.join(',');

  // π: ランダムに N 個生成して合計 1 に正規化
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

  // A: N×N 行列をランダム生成して各行正規化
  const Arows = [];
  for (let i = 0; i < N; i++) {
    let rowSum = 0;
    const row = [];
    for (let j = 0; j < N; j++) {
      const v = Math.random();
      row.push(v);
      rowSum += v;
    }
    for (let j = 0; j < N; j++) {
      row[j] = (row[j] / rowSum).toFixed(3);
    }
    Arows.push(row);
  }
  fwdAInput.value = Arows.map(r => r.join(',')).join('\n');

  // B: N×T 行列をランダム生成して各行正規化
  const Brows = [];
  for (let i = 0; i < N; i++) {
    let rowSum = 0;
    const row = [];
    for (let t = 0; t < T; t++) {
      const v = Math.random();
      row.push(v);
      rowSum += v;
    }
    for (let t = 0; t < T; t++) {
      row[t] = (row[t] / rowSum).toFixed(3);
    }
    Brows.push(row);
  }
  fwdBInput.value = Brows.map(r => r.join(',')).join('\n');
});

// =================================================
// 6) Viterbi アルゴリズム可視化
// =================================================
/**
 * Viterbi のステップを生成
 * @param {string[]} states
 * @param {string[]} observations
 * @param {number[]} pi
 * @param {number[][]} A
 * @param {number[][]} B
 * @returns {Array} ステップ情報リスト
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

  // --- t=0 初期化 ---
  const o0 = observations[0];
  for (let i = 0; i < N; i++) {
    delta[0][i] = pi[i] * B[i][obsIndex[o0]];
    psi[0][i] = 0;
    steps.push({
      type: 'cell',
      t: 0,
      i: i,
      value: delta[0][i].toFixed(4),
      message:
        `初期化 (t=0)：状態=${states[i]}\n` +
        `δ[0][${i}] = π[${i}] × b[${i}][${o0}] = ${pi[i]} × ${B[i][obsIndex[o0]]} = ${delta[0][i].toFixed(4)}`
    });
  }

  // --- t=1..T-1 ---
  for (let t = 1; t < T; t++) {
    const ot = observations[t];
    for (let j = 0; j < N; j++) {
      let maxVal = -1;
      let maxState = 0;
      // 前状態 i からの遷移をすべて比較
      for (let i = 0; i < N; i++) {
        const val = delta[t - 1][i] * A[i][j];
        steps.push({
          type: 'compare',
          t: t,
          from: i,
          to: j,
          message:
            `t=${t} 比較：δ[${t - 1}][${i}] (${delta[t - 1][i].toFixed(4)}) × a[${i}→${j}] (${A[i][j]}) = ${(val).toFixed(4)}`
        });
        if (val > maxVal) {
          maxVal = val;
          maxState = i;
        }
      }
      delta[t][j] = (maxVal * B[j][obsIndex[ot]]);
      psi[t][j] = maxState;
      steps.push({
        type: 'cell',
        t: t,
        i: j,
        value: delta[t][j].toFixed(4),
        message:
          `t=${t}：状態=${states[j]}\n` +
          `最大遷移 from=${states[maxState]} (${maxVal.toFixed(4)})\n` +
          `出力確率 b[${j}][${ot}] = ${B[j][obsIndex[ot]]}\n` +
          `→ δ[${t}][${j}] = ${maxVal.toFixed(4)} × ${B[j][obsIndex[ot]]} = ${delta[t][j].toFixed(4)}`
      });
    }
  }

  steps.push({
    type: 'end',
    message:
      `計算完了！ 最尤経路を ψ からバックトラックしてください。`
  });
  return steps;
}

/** Viterbi Initialize をクリックしたとき */
vitInitBtn.addEventListener('click', () => {
  // 1) 入力値をパース
  const states = vitStatesInput.value
    .trim()
    .split(',')
    .map(s => s.trim())
    .filter(s => s);
  const obsSeq = vitObsInput.value
    .trim()
    .split(',')
    .map(s => s.trim())
    .filter(s => s);
  const piVals = vitPiInput.value
    .trim()
    .split(',')
    .map(s => parseFloat(s.trim()));
  const Arows = vitAInput.value
    .trim()
    .split('\n')
    .map(line =>
      line
        .trim()
        .split(',')
        .map(x => parseFloat(x.trim()))
    );
  const Brows = vitBInput.value
    .trim()
    .split('\n')
    .map(line =>
      line
        .trim()
        .split(',')
        .map(x => parseFloat(x.trim()))
    );

  // 2) 入力チェック
  if (
    states.length === 0 ||
    obsSeq.length === 0 ||
    piVals.length !== states.length ||
    Arows.length !== states.length ||
    Brows.length !== states.length
  ) {
    alert('入力形式エラー：状態数・観測系列・π・A・B を正しく入力してください。');
    return;
  }

  // 3) ステップ配列を生成
  clearAutoPlay();
  viterbiSteps = generateViterbiSteps(states, obsSeq, piVals, Arows, Brows);
  currentIndex = 0;

  // 4) テーブル (トレリス) 再構築
  while (vitTable.firstChild) vitTable.firstChild.remove();
  const N = states.length;
  const T = obsSeq.length;

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

  // 5) 最初のステップを描画
  renderStep();
});

// ランダム生成（Viterbi）
vitRandomBtn.addEventListener('click', () => {
  // 状態数 N=2～4, 観測系列長 T=3～6
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
  for (let i = 0; i < N; i++) {
    piArr[i] = (piArr[i] / sumPi).toFixed(3);
  }
  vitPiInput.value = piArr.join(',');

  // A: N×N
  const Arows = [];
  for (let i = 0; i < N; i++) {
    let rowSum = 0;
    const row = [];
    for (let j = 0; j < N; j++) {
      const v = Math.random();
      row.push(v);
      rowSum += v;
    }
    for (let j = 0; j < N; j++) {
      row[j] = (row[j] / rowSum).toFixed(3);
    }
    Arows.push(row);
  }
  vitAInput.value = Arows.map(r => r.join(',')).join('\n');

  // B: N×T
  const Brows = [];
  for (let i = 0; i < N; i++) {
    let rowSum = 0;
    const row = [];
    for (let t = 0; t < T; t++) {
      const v = Math.random();
      row.push(v);
      rowSum += v;
    }
    for (let t = 0; t < T; t++) {
      row[t] = (row[t] / rowSum).toFixed(3);
    }
    Brows.push(row);
  }
  vitBInput.value = Brows.map(r => r.join(',')).join('\n');
});

// =================================================
// renderStep：各アルゴリズムのステップを表示
// =================================================
function renderStep() {
  let step;
  // 1) まず全てのセルから current/path クラスをクリア
  document.querySelectorAll('.trellis-table td').forEach(td => {
    td.classList.remove('current', 'path');
    // 既存の円要素も削除
    const c = td.querySelector('.circle');
    if (c) td.removeChild(c);
    const label = td.querySelector('.value-label');
    if (label) td.removeChild(label);
  });

  // --- Forward の場合 ---
  if (forwardControls.style.display === 'block') {
    if (forwardSteps.length === 0) return;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= forwardSteps.length) currentIndex = forwardSteps.length - 1;
    step = forwardSteps[currentIndex];

    if (step.type === 'cell') {
      // 対応するセルを current にする
      const cell = document.getElementById(`fwd-cell-${step.t}-${step.i}`);
      if (cell) {
        cell.classList.add('current');
        // 円を描画
        const circle = document.createElement('div');
        circle.classList.add('circle');
        cell.appendChild(circle);
        // 値をテキスト表示
        const lbl = document.createElement('div');
        lbl.classList.add('value-label');
        lbl.textContent = step.value;
        cell.appendChild(lbl);
      }
      fwdDesc.textContent = step.message;
    } else if (step.type === 'end') {
      fwdDesc.textContent = step.message;
    }

    updateStepButtons();
    updateProgress();
  }

  // --- Viterbi の場合 ---
  else if (viterbiControls.style.display === 'block') {
    if (viterbiSteps.length === 0) return;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= viterbiSteps.length) currentIndex = viterbiSteps.length - 1;
    step = viterbiSteps[currentIndex];

    if (step.type === 'compare') {
      // 比較ステップはメッセージだけ更新
      vitDesc.textContent = step.message;
    } else if (step.type === 'cell') {
      const cell = document.getElementById(`vit-cell-${step.t}-${step.i}`);
      if (cell) {
        cell.classList.add('current');
        // 円
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.style.backgroundColor = '#2196F3'; // 青色円
        cell.appendChild(circle);
        // 値ラベル
        const lbl = document.createElement('div');
        lbl.classList.add('value-label');
        lbl.textContent = step.value;
        cell.appendChild(lbl);
      }
      vitDesc.textContent = step.message;
    } else if (step.type === 'end') {
      vitDesc.textContent = step.message;
    }

    updateStepButtons();
    updateProgress();
  }
}

// -------------------------------------------------
// クリックイベントのバインディング
// -------------------------------------------------

// 1) Forward
fwdPrevBtn.addEventListener('click', onPrevStep);
fwdNextBtn.addEventListener('click', onNextStep);
fwdAutoBtn.addEventListener('click', toggleAutoPlay);

// 2) Viterbi
vitPrevBtn.addEventListener('click', onPrevStep);
vitNextBtn.addEventListener('click', onNextStep);
vitAutoBtn.addEventListener('click', toggleAutoPlay);

// ページ読み込み直後の初期状態
algoSelect.dispatchEvent(new Event('change'));
