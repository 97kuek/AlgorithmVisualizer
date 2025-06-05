// -------------------------------------------------
// 共通ユーティリティ関数
// -------------------------------------------------

/** msミリ秒だけ待つ Promise を返す */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * selector 内の .highlight クラスを一括で外す
 * 例: clearDistinctHighlights('#editTable')
 */
function clearDistinctHighlights(selector) {
  document.querySelectorAll(selector + ' .highlight').forEach(elem => {
    elem.classList.remove('highlight');
  });
}

/** 進捗テキストを更新 */
function updateProgress() {
  const total = steps.length;
  const current = (currentIndex < 0) ? 0 : (currentIndex + 1);
  if (editControls.style.display === 'block') {
    editProgress.textContent = `ステップ ${current} / ${total}`;
  } else if (knapControls.style.display === 'block') {
    knapProgress.textContent = `ステップ ${current} / ${total}`;
  } else if (sortControls.style.display === 'block') {
    sortProgress.textContent = `ステップ ${current} / ${total}`;
  } else if (searchControls.style.display === 'block') {
    searchProgress.textContent = `ステップ ${current} / ${total}`;
  } else if (forwardControls.style.display === 'block') {
    fwdProgress.textContent = `ステップ ${current} / ${total}`;
  } else if (viterbiControls.style.display === 'block') {
    vitProgress.textContent = `ステップ ${current} / ${total}`;
  } else if (lpControls.style.display === 'block') {
    lpProgress.textContent = `ステップ ${current} / ${total}`;
  } else if (hashControls.style.display === 'block') {
    hashProgress.textContent = `ステップ ${current} / ${total}`;
  }
}

/** すべてのステップ制御ボタンを disabled 化 */
function disableAllStepButtons() {
  [
    editPrevBtn, editNextBtn, editAutoBtn,
    knapPrevBtn, knapNextBtn, knapAutoBtn,
    sortPrevBtn, sortNextBtn, sortAutoBtn,
    searchPrevBtn, searchNextBtn, searchAutoBtn,
    fwdPrevBtn, fwdNextBtn, fwdAutoBtn,
    vitPrevBtn, vitNextBtn, vitAutoBtn,
    lpPrevBtn, lpNextBtn, lpAutoBtn,
    hashPrevBtn, hashNextBtn, hashAutoBtn
  ].forEach(btn => {
    if (btn) btn.disabled = true;
  });
}

/** 各セクションの現在状況に応じて「前へ」「次へ」「Auto Play」を有効／無効化 */
function updateStepButtons() {
  if (editControls.style.display === 'block' && steps.length > 0) {
    editPrevBtn.disabled = (currentIndex <= 0);
    editNextBtn.disabled = (currentIndex >= steps.length - 1);
    editAutoBtn.disabled = false;
  }
  if (knapControls.style.display === 'block' && steps.length > 0) {
    knapPrevBtn.disabled = (currentIndex <= 0);
    knapNextBtn.disabled = (currentIndex >= steps.length - 1);
    knapAutoBtn.disabled = false;
  }
  if (sortControls.style.display === 'block' && steps.length > 0) {
    sortPrevBtn.disabled = (currentIndex <= 0);
    sortNextBtn.disabled = (currentIndex >= steps.length - 1);
    sortAutoBtn.disabled = false;
  }
  if (searchControls.style.display === 'block' && steps.length > 0) {
    searchPrevBtn.disabled = (currentIndex <= 0);
    searchNextBtn.disabled = (currentIndex >= steps.length - 1);
    searchAutoBtn.disabled = false;
  }
  if (forwardControls.style.display === 'block' && steps.length > 0) {
    fwdPrevBtn.disabled = (currentIndex <= 0);
    fwdNextBtn.disabled = (currentIndex >= steps.length - 1);
    fwdAutoBtn.disabled = false;
  }
  if (viterbiControls.style.display === 'block' && steps.length > 0) {
    vitPrevBtn.disabled = (currentIndex <= 0);
    vitNextBtn.disabled = (currentIndex >= steps.length - 1);
    vitAutoBtn.disabled = false;
  }
  if (lpControls.style.display === 'block' && steps.length > 0) {
    lpPrevBtn.disabled = (currentIndex <= 0);
    lpNextBtn.disabled = (currentIndex >= steps.length - 1);
    lpAutoBtn.disabled = false;
  }
  if (hashControls.style.display === 'block' && steps.length > 0) {
    hashPrevBtn.disabled = (currentIndex <= 0);
    hashNextBtn.disabled = (currentIndex >= steps.length - 1);
    hashAutoBtn.disabled = false;
  }
}

/** 自動再生タイマーをクリア */
function clearAutoPlay() {
  if (autoTimer !== null) {
    clearInterval(autoTimer);
    autoTimer = null;
  }
  [
    editAutoBtn, knapAutoBtn, sortAutoBtn, searchAutoBtn,
    fwdAutoBtn, vitAutoBtn, lpAutoBtn, hashAutoBtn
  ].forEach(btn => {
    if (btn) btn.textContent = 'Auto Play';
  });
}

/**
 * Auto Play をトグル（再生／一時停止）する
 * 「倍率」をもとに間隔 (ms) を算出： baseInterval (1000ms) ÷ 倍率
 */
function toggleAutoPlay() {
  let interval, autoBtn, speedSelect;
  if (editControls.style.display === 'block') {
    speedSelect = parseFloat(editSpeedSelect.value);
    interval = Math.floor(1000 / speedSelect);
    autoBtn = editAutoBtn;
  } else if (knapControls.style.display === 'block') {
    speedSelect = parseFloat(knapSpeedSelect.value);
    interval = Math.floor(1000 / speedSelect);
    autoBtn = knapAutoBtn;
  } else if (sortControls.style.display === 'block') {
    speedSelect = parseFloat(sortSpeedSelect.value);
    interval = Math.floor(1000 / speedSelect);
    autoBtn = sortAutoBtn;
  } else if (searchControls.style.display === 'block') {
    speedSelect = parseFloat(searchSpeedSelect.value);
    interval = Math.floor(1000 / speedSelect);
    autoBtn = searchAutoBtn;
  } else if (forwardControls.style.display === 'block') {
    speedSelect = parseFloat(fwdSpeedSelect.value);
    interval = Math.floor(1000 / speedSelect);
    autoBtn = fwdAutoBtn;
  } else if (viterbiControls.style.display === 'block') {
    speedSelect = parseFloat(vitSpeedSelect.value);
    interval = Math.floor(1000 / speedSelect);
    autoBtn = vitAutoBtn;
  } else if (lpControls.style.display === 'block') {
    speedSelect = parseFloat(lpSpeedSelect.value);
    interval = Math.floor(1000 / speedSelect);
    autoBtn = lpAutoBtn;
  } else if (hashControls.style.display === 'block') {
    speedSelect = parseFloat(hashSpeedSelect.value);
    interval = Math.floor(1000 / speedSelect);
    autoBtn = hashAutoBtn;
  } else {
    return;
  }

  if (autoTimer === null) {
    autoBtn.textContent = 'Pause';
    autoTimer = setInterval(() => {
      if (currentIndex < steps.length - 1) {
        currentIndex++;
        renderStep();
      } else {
        clearAutoPlay();
        updateStepButtons();
      }
    }, interval);
  } else {
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
  if (currentIndex < steps.length - 1) {
    currentIndex++;
    renderStep();
  }
}

// -------------------------------------------------
// 各種要素を取得（HTML 上の ID と紐付け）
// -------------------------------------------------

const algoSelect      = document.getElementById('algoSelect');

/** 1) Edit Distance */
const editControls      = document.getElementById('editControls');
const editInitBtn       = document.getElementById('editInitBtn');
const editRandomBtn     = document.getElementById('editRandomBtn');
const editPrevBtn       = document.getElementById('editPrevBtn');
const editNextBtn       = document.getElementById('editNextBtn');
const editAutoBtn       = document.getElementById('editAutoBtn');
const editTable         = document.getElementById('editTable');
const editDesc          = document.getElementById('editDesc');
const editS1Input       = document.getElementById('edit_s1');
const editS2Input       = document.getElementById('edit_s2');
const editSpeedSelect   = document.getElementById('editSpeedSelect');
const editProgress      = document.getElementById('editProgress');

/** 2) 0/1 Knapsack */
const knapControls      = document.getElementById('knapControls');
const knapInitBtn       = document.getElementById('knapInitBtn');
const knapRandomBtn     = document.getElementById('knapRandomBtn');
const knapPrevBtn       = document.getElementById('knapPrevBtn');
const knapNextBtn       = document.getElementById('knapNextBtn');
const knapAutoBtn       = document.getElementById('knapAutoBtn');
const knapTable         = document.getElementById('knapTable');
const knapDesc          = document.getElementById('knapDesc');
const knapWeightsInput  = document.getElementById('knap_weights');
const knapValuesInput   = document.getElementById('knap_values');
const knapCapacityInput = document.getElementById('knap_capacity');
const knapSpeedSelect   = document.getElementById('knapSpeedSelect');
const knapProgress      = document.getElementById('knapProgress');

/** 3) Sorting */
const sortControls      = document.getElementById('sortControls');
const sortInitBtn       = document.getElementById('sortInitBtn');
const sortRandomBtn     = document.getElementById('sortRandomBtn');
const sortPrevBtn       = document.getElementById('sortPrevBtn');
const sortNextBtn       = document.getElementById('sortNextBtn');
const sortAutoBtn       = document.getElementById('sortAutoBtn');
const sortBars          = document.getElementById('sortBars');
const sortDesc          = document.getElementById('sortDesc');
const sortArrayInput    = document.getElementById('sort_array');
const sortAlgoSelect    = document.getElementById('sortAlgoSelect');
const sortSpeedSelect   = document.getElementById('sortSpeedSelect');
const sortProgress      = document.getElementById('sortProgress');

/** 4) Searching */
const searchControls     = document.getElementById('searchControls');
const searchInitBtn      = document.getElementById('searchInitBtn');
const searchRandomBtn    = document.getElementById('searchRandomBtn');
const searchPrevBtn      = document.getElementById('searchPrevBtn');
const searchNextBtn      = document.getElementById('searchNextBtn');
const searchAutoBtn      = document.getElementById('searchAutoBtn');
const searchBars         = document.getElementById('searchBars');
const searchDesc         = document.getElementById('searchDesc');
const searchArrayInput   = document.getElementById('search_array');
const searchKeyInput     = document.getElementById('search_key');
const searchAlgoSelect   = document.getElementById('searchAlgoSelect');
const searchSpeedSelect  = document.getElementById('searchSpeedSelect');
const searchProgress     = document.getElementById('searchProgress');

/** 5) Forward アルゴリズム */
const forwardControls    = document.getElementById('forwardControls');
const fwdStatesInput     = document.getElementById('fwd_states');
const fwdObsInput        = document.getElementById('fwd_obs');
const fwdPiInput         = document.getElementById('fwd_pi');
const fwdAInput          = document.getElementById('fwd_A');
const fwdBInput          = document.getElementById('fwd_B');
const fwdInitBtn         = document.getElementById('fwdInitBtn');
const fwdRandomBtn       = document.getElementById('fwdRandomBtn');
const fwdTable           = document.getElementById('fwdTable');
const fwdDesc            = document.getElementById('fwdDesc');
const fwdPrevBtn         = document.getElementById('fwdPrevBtn');
const fwdNextBtn         = document.getElementById('fwdNextBtn');
const fwdAutoBtn         = document.getElementById('fwdAutoBtn');
const fwdSpeedSelect     = document.getElementById('fwdSpeedSelect');
const fwdProgress        = document.getElementById('fwdProgress');

/** 6) Viterbi アルゴリズム */
const viterbiControls    = document.getElementById('viterbiControls');
const vitStatesInput     = document.getElementById('vit_states');
const vitObsInput        = document.getElementById('vit_obs');
const vitPiInput         = document.getElementById('vit_pi');
const vitAInput          = document.getElementById('vit_A');
const vitBInput          = document.getElementById('vit_B');
const vitInitBtn         = document.getElementById('vitInitBtn');
const vitRandomBtn       = document.getElementById('vitRandomBtn');
const vitTable           = document.getElementById('vitTable');
const vitDesc            = document.getElementById('vitDesc');
const vitPrevBtn         = document.getElementById('vitPrevBtn');
const vitNextBtn         = document.getElementById('vitNextBtn');
const vitAutoBtn         = document.getElementById('vitAutoBtn');
const vitSpeedSelect     = document.getElementById('vitSpeedSelect');
const vitProgress        = document.getElementById('vitProgress');

/** 7) 線形計画法（単純形法） */
const lpControls         = document.getElementById('lpControls');
const lp_input           = document.getElementById('lp_input');
const lpInitBtn          = document.getElementById('lpInitBtn');
const lpRandomBtn        = document.getElementById('lpRandomBtn');
const lpPrevBtn          = document.getElementById('lpPrevBtn');
const lpNextBtn          = document.getElementById('lpNextBtn');
const lpAutoBtn          = document.getElementById('lpAutoBtn');
const simplexTable       = document.getElementById('simplexTable');
const lpSpeedSelect      = document.getElementById('lpSpeedSelect');
const lpProgress         = document.getElementById('lpProgress');
const lpDesc             = document.getElementById('lpDesc');

/** 8) ハッシュ法（オープンアドレス法） */
const hashControls       = document.getElementById('hashControls');
const hash_m             = document.getElementById('hash_m');
const hash_keys          = document.getElementById('hash_keys');
const hashInitBtn        = document.getElementById('hashInitBtn');
const hashRandomBtn      = document.getElementById('hashRandomBtn');
const hashPrevBtn        = document.getElementById('hashPrevBtn');
const hashNextBtn        = document.getElementById('hashNextBtn');
const hashAutoBtn        = document.getElementById('hashAutoBtn');
const hashContainer      = document.getElementById('hashContainer');
const hashSpeedSelect    = document.getElementById('hashSpeedSelect');
const hashProgress       = document.getElementById('hashProgress');
const hashDesc           = document.getElementById('hashDesc');

// -------------------------------------------------
// アルゴリズム用ステップ配列・現在インデックス・自動再生タイマー
// -------------------------------------------------
let steps = [], currentIndex = -1, autoTimer = null;

// Base interval は 1000ms とし、選択された倍率で割って使用する
const BASE_INTERVAL = 1000;

// -------------------------------------------------
// アルゴリズム選択時に各セクションを表示／非表示
// -------------------------------------------------
algoSelect.addEventListener('change', () => {
  const val = algoSelect.value;
  [
    editControls, knapControls, sortControls, searchControls,
    forwardControls, viterbiControls, lpControls, hashControls
  ].forEach(div => {
    div.style.display = 'none';
  });
  clearAutoPlay();
  disableAllStepButtons();
  if (val === 'edit')        editControls.style.display = 'block';
  else if (val === 'knapsack')knapControls.style.display = 'block';
  else if (val === 'sorting') sortControls.style.display = 'block';
  else if (val === 'searching')searchControls.style.display = 'block';
  else if (val === 'forward') forwardControls.style.display = 'block';
  else if (val === 'viterbi') viterbiControls.style.display = 'block';
  else if (val === 'lp')      lpControls.style.display = 'block';
  else if (val === 'hash')    hashControls.style.display = 'block';
});

// =================================================
// 1) Edit Distance（レーベンシュタイン距離）可視化
// =================================================
function generateEditDistanceSteps(s1, s2) {
  const n = s1.length, m = s2.length;
  const dp = [];
  for (let i = 0; i <= n; i++) dp.push(new Array(m + 1).fill(0));
  const tableSteps = [];

  // dp[0][0] = 0
  dp[0][0] = 0;
  tableSteps.push({
    type: 'cell', i: 0, j: 0, value: 0,
    message: `dp[0][0] = 0 に初期化。空文字→空文字なので操作不要です。`
  });
  // 0行目・0列目を初期化
  for (let i = 1; i <= n; i++) {
    dp[i][0] = i;
    tableSteps.push({
      type: 'cell', i: i, j: 0, value: dp[i][0],
      message: `dp[${i}][0] = ${i} に設定（削除コスト）。\n「${s1.charAt(i-1)}」を削除して空文字にする操作が ${i} 回。`
    });
  }
  for (let j = 1; j <= m; j++) {
    dp[0][j] = j;
    tableSteps.push({
      type: 'cell', i: 0, j: j, value: dp[0][j],
      message: `dp[0][${j}] = ${j} に設定（挿入コスト）。\n空文字→「${s2.charAt(j-1)}」を挿入し続ける操作が ${j} 回。`
    });
  }
  // メインループ
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = (s1.charAt(i - 1) === s2.charAt(j - 1)) ? 0 : 1;
      const deleteCost = dp[i - 1][j] + 1;
      const insertCost = dp[i][j - 1] + 1;
      const replaceCost = dp[i - 1][j - 1] + cost;
      const minCost = Math.min(deleteCost, insertCost, replaceCost);
      dp[i][j] = minCost;

      let explanation;
      if (cost === 0) {
        explanation = `文字「${s1.charAt(i-1)}」と「${s2.charAt(j-1)}」は同じ (置換コスト=0)。`;
      } else {
        explanation = `文字「${s1.charAt(i-1)}」と「${s2.charAt(j-1)}」は異なる (置換コスト=1)。`;
      }
      explanation += `\n削除: dp[${i-1}][${j}]+1 = ${deleteCost} 、挿入: dp[${i}][${j-1}]+1 = ${insertCost} 、置換: dp[${i-1}][${j-1}]+${cost} = ${replaceCost}。`;
      explanation += `\n→ 最小値 ${dp[i][j]} を dp[${i}][${j}] に設定。`;

      tableSteps.push({
        type: 'cell', i: i, j: j, value: dp[i][j],
        message: explanation
      });
    }
  }
  tableSteps.push({
    type: 'end',
    message: `計算完了！ 編集距離は dp[${n}][${m}] = ${dp[n][m]} です。`
  });
  return tableSteps;
}

editInitBtn.addEventListener('click', () => {
  const s1 = editS1Input.value.trim();
  const s2 = editS2Input.value.trim();
  if (!s1 || !s2) {
    alert('文字列 1 と 文字列 2 を両方入力してください。');
    return;
  }
  clearAutoPlay();
  steps = generateEditDistanceSteps(s1, s2);
  currentIndex = 0;

  // テーブル再構築
  while (editTable.firstChild) editTable.firstChild.remove();
  const n = s1.length, m = s2.length;
  for (let r = 0; r <= n + 1; r++) {
    const tr = document.createElement('tr');
    for (let c = 0; c <= m + 1; c++) {
      let cell;
      if (r === 0 || c === 0) cell = document.createElement('th');
      else cell = document.createElement('td');
      if (r >= 1 && c >= 1) {
        const i = r - 1, j = c - 1;
        cell.id = `editTable-cell-${i}-${j}`;
        cell.textContent = '';
      }
      if (r === 0 && c === 0) cell.textContent = '';
      else if (r === 0 && c >= 2) cell.textContent = s2[c - 2];
      else if (c === 0 && r >= 2) cell.textContent = s1[r - 2];
      else if ((r === 0 && c === 1) || (r === 1 && c === 0)) cell.textContent = '';
      tr.appendChild(cell);
    }
    editTable.appendChild(tr);
  }
  renderStep();
});

// ランダム文字列生成（Edit Distance）
editRandomBtn.addEventListener('click', () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const len1 = Math.floor(Math.random() * 6) + 3;
  const len2 = Math.floor(Math.random() * 6) + 3;
  let s1 = '', s2 = '';
  for (let i = 0; i < len1; i++) {
    s1 += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  for (let i = 0; i < len2; i++) {
    s2 += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  editS1Input.value = s1;
  editS2Input.value = s2;
});

// =================================================
// 2) 0/1 Knapsack 可視化
// =================================================
function generateKnapsackSteps(weights, values, capacity) {
  const n = weights.length;
  const W = capacity;
  const dp = [];
  for (let i = 0; i <= n; i++) dp.push(new Array(W + 1).fill(0));
  const tableSteps = [];

  // i=0 の行
  for (let j = 0; j <= W; j++) {
    dp[0][j] = 0;
    tableSteps.push({
      type: 'cell', i: 0, j: j, value: 0,
      message: `品物0個で容量${j}なら価値0。`
    });
  }
  // i=1..n の行
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= W; j++) {
      if (weights[i - 1] > j) {
        dp[i][j] = dp[i - 1][j];
        tableSteps.push({
          type: 'cell', i: i, j: j, value: dp[i][j],
          message: `品物 ${i}（重さ=${weights[i - 1]}）は容量${j}に入らない → dp[${i}][${j}] = ${dp[i - 1][j]}`
        });
      } else {
        const withoutItem = dp[i - 1][j];
        const withItem = dp[i - 1][j - weights[i - 1]] + values[i - 1];
        if (withoutItem >= withItem) {
          dp[i][j] = withoutItem;
          tableSteps.push({
            type: 'cell', i: i, j: j, value: dp[i][j],
            message:
              `品物 ${i} (重${weights[i - 1]}, 価値${values[i - 1]}) を入れない場合 = ${withoutItem}\n` +
              `入れる場合 = ${withItem}\n→ ${withoutItem} の方が大きいので dp[${i}][${j}] = ${withoutItem}`
          });
        } else {
          dp[i][j] = withItem;
          tableSteps.push({
            type: 'cell', i: i, j: j, value: dp[i][j],
            message:
              `品物 ${i} (重${weights[i - 1]}, 価値${values[i - 1]}) を入れる場合 = ${withItem}\n→ dp[${i}][${j}] = ${withItem}`
          });
        }
      }
    }
  }
  tableSteps.push({
    type: 'end',
    message: `計算完了！ 最大価値は dp[${n}][${W}] = ${dp[n][W]} です。`
  });
  return tableSteps;
}

knapInitBtn.addEventListener('click', () => {
  const wText = knapWeightsInput.value.trim();
  const vText = knapValuesInput.value.trim();
  const capText = knapCapacityInput.value.trim();
  if (!wText || !vText || !capText) {
    alert('重み・価値・容量 をすべて入力してください。');
    return;
  }
  const weights = wText.split(',').map(s => parseInt(s.trim(), 10));
  const values  = vText.split(',').map(s => parseInt(s.trim(), 10));
  const capacity = parseInt(capText, 10);
  if (
    weights.length === 0 || values.length === 0 ||
    weights.length !== values.length ||
    isNaN(capacity) || capacity < 0 ||
    weights.some(isNaN) || values.some(isNaN)
  ) {
    alert('形式エラー：重みと価値のリストは同じ要素数の数値、容量は正の整数で入力してください。');
    return;
  }
  clearAutoPlay();
  steps = generateKnapsackSteps(weights, values, capacity);
  currentIndex = 0;

  // テーブル再構築
  while (knapTable.firstChild) knapTable.firstChild.remove();
  const n = weights.length, W = capacity;
  for (let r = 0; r <= n + 1; r++) {
    const tr = document.createElement('tr');
    for (let c = 0; c <= W + 1; c++) {
      let cell;
      if (r === 0 || c === 0) cell = document.createElement('th');
      else cell = document.createElement('td');
      if (r >= 1 && c >= 1) {
        const i = r - 1, j = c - 1;
        cell.id = `knapTable-cell-${i}-${j}`;
        cell.textContent = '';
      }
      if (r === 0 && c === 0) cell.textContent = '';
      else if (r === 0 && c >= 2) cell.textContent = c - 1;
      else if (c === 0 && r >= 2) cell.textContent = r - 1;
      else if ((r === 0 && c === 1) || (r === 1 && c === 0)) cell.textContent = '';
      tr.appendChild(cell);
    }
    knapTable.appendChild(tr);
  }
  renderStep();
});

// ランダム生成（Knapsack）
knapRandomBtn.addEventListener('click', () => {
  const count = Math.floor(Math.random() * 5) + 3;
  const maxW  = Math.floor(Math.random() * 10) + 5;
  const maxV  = Math.floor(Math.random() * 10) + 5;
  const weights = [], values = [];
  for (let i = 0; i < count; i++) {
    weights.push(Math.floor(Math.random() * maxW) + 1);
    values.push(Math.floor(Math.random() * maxV) + 1);
  }
  const capacity = Math.floor(weights.reduce((a, b) => a + b, 0) / 2);
  knapWeightsInput.value  = weights.join(',');
  knapValuesInput.value   = values.join(',');
  knapCapacityInput.value = capacity.toString();
});

// =================================================
// 3) Sorting（ソート）
// =================================================
/** バーをレンダリング */
function renderBars(wrapper, array, highlightIndices) {
  while (wrapper.firstChild) wrapper.firstChild.remove();
  if (!array || array.length === 0) return;
  const maxVal = Math.max(...array);
  array.forEach((val, idx) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    const heightPercent = (val / maxVal) * 100;
    bar.style.height = heightPercent + '%';
    if (highlightIndices.includes(idx)) bar.classList.add('highlight');
    wrapper.appendChild(bar);
  });
}

/** バブルソートのステップを生成 */
function generateBubbleSortSteps(arrInput) {
  const arr = arrInput.slice();
  const n = arr.length;
  const steps = [];
  steps.push({
    type: 'row', row: arr.slice(), highlight: [],
    message: `初期配列: [${arr.join(', ')}]\nバブルソートを開始します。`
  });
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({
        type: 'row', row: arr.slice(), highlight: [j, j + 1],
        message: `比較: インデックス ${j}（値 ${arr[j]}） と ${j+1}（値 ${arr[j+1]}）`
      });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          type: 'row', row: arr.slice(), highlight: [j, j + 1],
          message: `交換: ${arr[j]} と ${arr[j + 1]} → [${arr.join(', ')}]`
        });
      } else {
        steps.push({
          type: 'row', row: arr.slice(), highlight: [j, j + 1],
          message: `交換不要: ${arr[j]} ≤ ${arr[j + 1]}`
        });
      }
    }
    steps.push({
      type: 'row', row: arr.slice(), highlight: [],
      message: `パス ${i + 1} 完了: [${arr.join(', ')}]`
    });
  }
  steps.push({
    type: 'row', row: arr.slice(), highlight: [],
    message: `最終ソート完了: [${arr.join(', ')}]`
  });
  return steps;
}

/** クイックソートのステップを生成 */
function generateQuickSortSteps(arrInput) {
  const arr = arrInput.slice();
  const steps = [];
  function partition(a, low, high) {
    const pivot = a[high];
    let i = low - 1;
    steps.push({
      type: 'row', row: a.slice(), highlight: [high],
      message: `パーティション: low=${low}, high=${high}, pivot=${pivot}`
    });
    for (let j = low; j < high; j++) {
      steps.push({
        type: 'row', row: a.slice(), highlight: [j, high],
        message: `比較: a[${j}]=${a[j]} と pivot=${pivot}`
      });
      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({
          type: 'row', row: a.slice(), highlight: [i, j],
          message: `交換: a[${i}] と a[${j}] → [${a.join(', ')}]`
        });
      } else {
        steps.push({
          type: 'row', row: a.slice(), highlight: [j, high],
          message: `交換不要: ${a[j]} ≥ ${pivot}`
        });
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    steps.push({
      type: 'row', row: a.slice(), highlight: [i + 1, high],
      message: `pivot を正しい位置 ${i+1} に移動 → [${a.join(', ')}]`
    });
    return i + 1;
  }
  function quickSortRec(a, low, high) {
    if (low < high) {
      const pi = partition(a, low, high);
      quickSortRec(a, low, pi - 1);
      quickSortRec(a, pi + 1, high);
    }
  }
  quickSortRec(arr, 0, arr.length - 1);
  steps.push({
    type: 'row', row: arr.slice(), highlight: [],
    message: `最終ソート完了: [${arr.join(', ')}]`
  });
  return steps;
}

/** マージソートのステップを生成 */
function generateMergeSortSteps(arrInput) {
  const arr = arrInput.slice();
  const steps = [];
  function merge(a, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = [], R = [];
    for (let i = 0; i < n1; i++) L.push(a[l + i]);
    for (let j = 0; j < n2; j++) R.push(a[m + 1 + j]);
    let i = 0, j = 0, k = l;
    steps.push({
      type: 'row', row: a.slice(), highlight: [],
      message: `マージ: 左=[${L.join(', ')}], 右=[${R.join(', ')}]`
    });
    while (i < n1 && j < n2) {
      steps.push({
        type: 'row', row: a.slice(), highlight: [k],
        message: `比較: L[${i}]=${L[i]} と R[${j}]=${R[j]}`
      });
      if (L[i] <= R[j]) {
        a[k] = L[i];
        steps.push({
          type: 'row', row: a.slice(), highlight: [k],
          message: `配置: ${L[i]} を a[${k}] に`
        });
        i++;
      } else {
        a[k] = R[j];
        steps.push({
          type: 'row', row: a.slice(), highlight: [k],
          message: `配置: ${R[j]} を a[${k}] に`
        });
        j++;
      }
      k++;
    }
    while (i < n1) {
      a[k] = L[i];
      steps.push({
        type: 'row', row: a.slice(), highlight: [k],
        message: `残った左 ${L[i]} → a[${k}]`
      });
      i++; k++;
    }
    while (j < n2) {
      a[k] = R[j];
      steps.push({
        type: 'row', row: a.slice(), highlight: [k],
        message: `残った右 ${R[j]} → a[${k}]`
      });
      j++; k++;
    }
    steps.push({
      type: 'row', row: a.slice(), highlight: [],
      message: `部分配列マージ完了: [${a.slice(l, r + 1).join(', ')}]`
    });
  }
  function mergeSortRec(a, l, r) {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      mergeSortRec(a, l, m);
      mergeSortRec(a, m + 1, r);
      merge(a, l, m, r);
    }
  }
  mergeSortRec(arr, 0, arr.length - 1);
  steps.push({
    type: 'row', row: arr.slice(), highlight: [],
    message: `最終ソート完了: [${arr.join(', ')}]`
  });
  return steps;
}

sortInitBtn.addEventListener('click', () => {
  const arrText = sortArrayInput.value.trim();
  if (!arrText) {
    alert('ソート対象リストを入力してください。');
    return;
  }
  const arr = arrText.split(',').map(s => parseInt(s.trim(), 10));
  if (arr.some(isNaN)) {
    alert('形式エラー：数値リストをカンマ区切りで入力してください。');
    return;
  }
  const algo = sortAlgoSelect.value;
  clearAutoPlay();
  switch (algo) {
    case 'bubble': steps = generateBubbleSortSteps(arr);   break;
    case 'quick':  steps = generateQuickSortSteps(arr);    break;
    case 'merge':  steps = generateMergeSortSteps(arr);    break;
    default:       steps = generateBubbleSortSteps(arr);   break;
  }
  currentIndex = 0;
  if (steps.length > 0 && steps[0].row) {
    renderBars(sortBars, steps[0].row, []);
  }
  renderStep();
});

// ランダム生成（Sorting）
sortRandomBtn.addEventListener('click', () => {
  const size   = Math.floor(Math.random() * 14) + 5;
  const maxVal = Math.floor(Math.random() * 90) + 10;
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * maxVal) + 1);
  }
  sortArrayInput.value = arr.join(',');
  renderBars(sortBars, arr, []);
});

// =================================================
// 4) Searching（線形探索／2分探索／番兵法）
// =================================================
function generateLinearSearchSteps(arrInput, key) {
  const arr = arrInput.slice();
  const steps = [];
  for (let i = 0; i < arr.length; i++) {
    steps.push({
      type: 'idx', idx: i,
      message: `線形探索: インデックス ${i} をチェック → 値 = ${arr[i]}`
    });
    if (arr[i] === key) {
      steps.push({
        type: 'idx', idx: i,
        message: `キー ${key} をインデックス ${i} で発見！`
      });
      return steps;
    }
  }
  steps.push({
    type: 'idx', idx: -1,
    message: `探索終了：キー ${key} は配列に存在しません。`
  });
  return steps;
}

function generateBinarySearchSteps(arrInput, key) {
  const arr = arrInput.slice();
  const steps = [];
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps.push({
      type: 'idx', idx: mid,
      message: `2分探索: left=${left}, right=${right}, mid=${mid} → arr[mid]=${arr[mid]}`
    });
    if (arr[mid] === key) {
      steps.push({
        type: 'idx', idx: mid,
        message: `キー ${key} をインデックス ${mid} で発見！`
      });
      return steps;
    } else if (arr[mid] < key) {
      steps.push({
        type: 'idx', idx: mid,
        message: `${arr[mid]} < ${key} → left=${mid + 1}`
      });
      left = mid + 1;
    } else {
      steps.push({
        type: 'idx', idx: mid,
        message: `${arr[mid]} > ${key} → right=${mid - 1}`
      });
      right = mid - 1;
    }
  }
  steps.push({
    type: 'idx', idx: -1,
    message: `探索終了：キー ${key} は配列に存在しません。`
  });
  return steps;
}

function generateSentinelSearchSteps(arrInput, key) {
  const arr = arrInput.slice();
  const steps = [];
  const n = arr.length;
  arr.push(key); // 番兵
  steps.push({
    type: 'idx', idx: -1,
    message: `番兵法：末尾に ${key} を追加（元長さ=${n}）`
  });
  for (let i = 0; i < arr.length; i++) {
    steps.push({
      type: 'idx', idx: i,
      message: `チェック: インデックス ${i} → 値=${arr[i]}`
    });
    if (arr[i] === key) {
      if (i < n) {
        steps.push({
          type: 'idx', idx: i,
          message: `キー ${key} をインデックス ${i} で発見！`
        });
      } else {
        steps.push({
          type: 'idx', idx: -1,
          message: `探索終了：キー ${key} は元配列に存在しません。`
        });
      }
      arr.pop();
      return steps;
    }
  }
  arr.pop();
  steps.push({
    type: 'idx', idx: -1,
    message: `探索終了：キー ${key} は配列に存在しません。`
  });
  return steps;
}

searchInitBtn.addEventListener('click', () => {
  const arrText = searchArrayInput.value.trim();
  const keyText = searchKeyInput.value.trim();
  if (!arrText || !keyText) {
    alert('探索対象配列と探索キーを入力してください。');
    return;
  }
  const arr = arrText.split(',').map(s => parseInt(s.trim(), 10));
  const key = parseInt(keyText, 10);
  if (arr.some(isNaN) || isNaN(key)) {
    alert('形式エラー：配列は数値,数値,…、キーは数値で入力してください。');
    return;
  }
  const algo = searchAlgoSelect.value;
  clearAutoPlay();
  switch (algo) {
    case 'linear':   steps = generateLinearSearchSteps(arr, key);   break;
    case 'binary':   steps = generateBinarySearchSteps(arr, key);   break;
    case 'sentinel': steps = generateSentinelSearchSteps(arr, key); break;
    default:         steps = [];
  }
  currentIndex = 0;
  renderBars(searchBars, arr, []);
  renderStep();
});

// ランダム生成（Searching）
searchRandomBtn.addEventListener('click', () => {
  const size   = Math.floor(Math.random() * 14) + 5;
  const maxVal = Math.floor(Math.random() * 90) + 10;
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * maxVal) + 1);
  }
  arr.sort((a, b) => a - b);
  const key = arr[Math.floor(Math.random() * arr.length)];
  searchArrayInput.value = arr.join(',');
  searchKeyInput.value   = key.toString();
  renderBars(searchBars, arr, []);
});

/** 検索ステップのバーをハイライト */
function highlightSearchCell(selector, idx) {
  if (idx < 0) return;
  const cell = document.querySelector(selector + ' .bar:nth-child(' + (idx + 1) + ')');
  if (cell) cell.classList.add('highlight');
}

// =================================================
// 5) Forward アルゴリズム（トレリス可視化）
// =================================================
/**
 * HMM 入力形式を解析し、トレリスステップを生成
 * @param {string[]} states        状態名の配列
 * @param {string[]} observations  観測記号の配列
 * @param {number[]} pi            初期確率（状態と同順）
 * @param {number[][]} A           遷移確率行列（A[i][j] = i→j の確率）
 * @param {number[][]} B           出力確率行列（B[i][k] = 状態 i で観測 k を観測する確率）
 */
function generateForwardSteps(states, observations, pi, A, B) {
  const N = states.length;       // 状態数
  const T = observations.length; // 観測系列長

  // 観測記号を index に変換するマップ
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
      message: `初期化 (t=0) 状態=${states[i]}: α[0][${i}] = π[${i}] * b[${i}][${o0}] = ${pi[i]} * ${B[i][obsIndex[o0]]} = ${alpha[0][i].toFixed(5)}`
    });
  }

  // t=1..T-1
  for (let t = 1; t < T; t++) {
    const ot = observations[t];
    for (let j = 0; j < N; j++) {
      // α[t][j] = Σ_{i=0 to N-1} α[t-1][i] * A[i][j]  × B[j][ot]
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
          `前時刻の α の総和 = Σ_{i} α[${t - 1}][i]*a[i→${j}] = ${(sumPrev).toFixed(5)}\n` +
          `出力確率 b[${j}][${ot}] = ${B[j][obsIndex[ot]]}\n` +
          `→ α[${t}][${j}] = ${sumPrev.toFixed(5)} × ${B[j][obsIndex[ot]]} = ${val.toFixed(5)}`
      });
    }
  }

  steps.push({
    type: 'end',
    message: `計算終了！ 観測系列全体の尤度 = Σ_{i} α[T-1][i] = ` +
             `${alpha[T - 1].map(v => v.toFixed(5)).join(' + ')}`
  });
  return { steps, alphaMatrix: alpha };
}

/** ForwardInitialize をクリック時の処理 */
fwdInitBtn.addEventListener('click', () => {
  const states = fwdStatesInput.value.trim().split(',').map(s => s.trim());
  const obsSeq = fwdObsInput.value.trim().split(',').map(s => s.trim());
  const piVals = fwdPiInput.value.trim().split(',').map(s => parseFloat(s.trim()));
  const Arows  = fwdAInput.value.trim().split('\n').map(line =>
    line.split(',').map(x => parseFloat(x.trim()))
  );
  const Brows  = fwdBInput.value.trim().split('\n').map(line =>
    line.split(',').map(x => parseFloat(x.trim()))
  );

  // 入力妥当性チェック
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
  const result = generateForwardSteps(states, obsSeq, piVals, Arows, Brows);
  steps = result.steps;
  currentIndex = 0;

  // テーブルを再構築（行：状態、列：時刻 t=0..T-1）
  while (fwdTable.firstChild) fwdTable.firstChild.remove();
  const N = states.length;
  const T = obsSeq.length;
  // ヘッダー行
  const thead = document.createElement('thead');
  const trH = document.createElement('tr');
  trH.appendChild(document.createElement('th')); // 左上空白
  for (let t = 0; t < T; t++) {
    const th = document.createElement('th');
    th.textContent = `t=${t} (${obsSeq[t]})`;
    th.classList.add('trellis-header');
    trH.appendChild(th);
  }
  thead.appendChild(trH);
  fwdTable.appendChild(thead);

  // ボディ部分
  const tbody = document.createElement('tbody');
  for (let i = 0; i < N; i++) {
    const tr = document.createElement('tr');
    const thState = document.createElement('th');
    thState.textContent = states[i];
    tr.appendChild(thState);
    for (let t = 0; t < T; t++) {
      const td = document.createElement('td');
      td.id = `fwdTable-cell-${t}-${i}`;
      td.textContent = '';
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  fwdTable.appendChild(tbody);

  renderStep();
});

// ランダム生成（Forward）
fwdRandomBtn.addEventListener('click', () => {
  // ランダムな HMM を生成：状態数 2～4、観測系列長 3～6
  const N = Math.floor(Math.random() * 3) + 2; // 2..4
  const T = Math.floor(Math.random() * 4) + 3; // 3..6
  // 状態名
  const states = [];
  for (let i = 0; i < N; i++) states.push(`S${i}`);
  fwdStatesInput.value = states.join(',');
  // 観測記号は 'o0','o1',... ランダムに選ぶ長さ T
  const observations = [];
  for (let t = 0; t < T; t++) observations.push(`o${t}`);
  fwdObsInput.value = observations.join(',');
  // π はランダム確率（合計1に正規化）
  let sumPi = 0;
  const piArr = [];
  for (let i = 0; i < N; i++) {
    const val = Math.random();
    piArr.push(val);
    sumPi += val;
  }
  for (let i = 0; i < N; i++) piArr[i] = +(piArr[i] / sumPi).toFixed(3);
  fwdPiInput.value = piArr.join(',');

  // A, B 行列をランダム生成し、正規化してテキストに反映
  // A: N×N、各行正規化
  const Arows = [];
  for (let i = 0; i < N; i++) {
    let rowSum = 0;
    const row = [];
    for (let j = 0; j < N; j++) {
      const val = Math.random();
      row.push(val);
      rowSum += val;
    }
    for (let j = 0; j < N; j++) row[j] = +(row[j] / rowSum).toFixed(3);
    Arows.push(row);
  }
  fwdAInput.value = Arows.map(r => r.join(',')).join('\n');

  // B: N×T、各行正規化
  const BrowsArr = [];
  for (let i = 0; i < N; i++) {
    let rowSum = 0;
    const row = [];
    for (let t = 0; t < T; t++) {
      const val = Math.random();
      row.push(val);
      rowSum += val;
    }
    for (let t = 0; t < T; t++) row[t] = +(row[t] / rowSum).toFixed(3);
    BrowsArr.push(row);
  }
  fwdBInput.value = BrowsArr.map(r => r.join(',')).join('\n');
});

// =================================================
// 6) Viterbi アルゴリズム（トレリス可視化）
// =================================================
/**
 * Viterbi 用ステップを生成
 * @param {string[]} states        状態名リスト
 * @param {string[]} observations  観測系列（記号リスト）
 * @param {number[]} pi            初期確率
 * @param {number[][]} A           遷移確率
 * @param {number[][]} B           出力確率
 */
function generateViterbiSteps(states, observations, pi, A, B) {
  const N = states.length;
  const T = observations.length;
  const obsIndex = {};
  observations.forEach((o, idx) => obsIndex[o] = idx);

  // δ[t][i]：t までの最尤確率
  // ψ[t][i]：最尤経路の前状態
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
      message: `初期化 (t=0) 状態=${states[i]}: δ[0][${i}] = π[${i}] * b[${i}][${o0}] = ${pi[i]} * ${B[i][obsIndex[o0]]} = ${delta[0][i].toFixed(5)}`
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
          message: `t=${t} 比較: δ[${t - 1}][${i}] (${delta[t - 1][i].toFixed(5)}) * a[${i}→${j}] (${A[i][j]}) = ${(val).toFixed(5)}`
        });
        if (val > maxVal) {
          maxVal = val;
          maxState = i;
        }
      }
      delta[t][j] = maxVal * B[j][obsIndex[ot]];
      psi[t][j]   = maxState;
      steps.push({
        type: 'cell',
        t: t,
        i: j,
        value: delta[t][j].toFixed(5),
        message:
          `t=${t} 状態=${states[j]}:\n` +
          `最大転移確率 from=${states[maxState]} (${maxVal.toFixed(5)})\n` +
          `出力確率 b[${j}][${ot}] = ${B[j][obsIndex[ot]]}\n` +
          `→ δ[${t}][${j}] = ${maxVal.toFixed(5)} * ${B[j][obsIndex[ot]]} = ${delta[t][j].toFixed(5)}`
      });
    }
  }
  // 最終ステップで最尤終端状態を決定
  let finalMax = -1, finalState = 0;
  for (let i = 0; i < N; i++) {
    if (delta[T - 1][i] > finalMax) {
      finalMax = delta[T - 1][i];
      finalState = i;
    }
  }
  steps.push({
    type: 'end',
    message: `計算完了！ 最尤終端は状態=${states[finalState]} (確率=${finalMax.toFixed(5)})`
  });
  return { steps, deltaMatrix: delta, psiMatrix: psi };
}

vitInitBtn.addEventListener('click', () => {
  const states = vitStatesInput.value.trim().split(',').map(s => s.trim());
  const obsSeq = vitObsInput.value.trim().split(',').map(s => s.trim());
  const piVals = vitPiInput.value.trim().split(',').map(s => parseFloat(s.trim()));
  const Arows  = vitAInput.value.trim().split('\n').map(line =>
    line.split(',').map(x => parseFloat(x.trim()))
  );
  const Brows  = vitBInput.value.trim().split('\n').map(line =>
    line.split(',').map(x => parseFloat(x.trim()))
  );

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
  steps = result.steps;
  currentIndex = 0;

  // テーブル再構築（行：状態、列：時刻 t=0..T-1）
  while (vitTable.firstChild) vitTable.firstChild.remove();
  const N = states.length;
  const T = obsSeq.length;
  const thead = document.createElement('thead');
  const trH = document.createElement('tr');
  trH.appendChild(document.createElement('th'));
  for (let t = 0; t < T; t++) {
    const th = document.createElement('th');
    th.textContent = `t=${t} (${obsSeq[t]})`;
    th.classList.add('trellis-header');
    trH.appendChild(th);
  }
  thead.appendChild(trH);
  vitTable.appendChild(thead);

  const tbody = document.createElement('tbody');
  for (let i = 0; i < N; i++) {
    const tr = document.createElement('tr');
    const thState = document.createElement('th');
    thState.textContent = states[i];
    tr.appendChild(thState);
    for (let t = 0; t < T; t++) {
      const td = document.createElement('td');
      td.id = `vitTable-cell-${t}-${i}`;
      td.textContent = '';
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  vitTable.appendChild(tbody);

  renderStep();
});

// ランダム生成（Viterbi）
vitRandomBtn.addEventListener('click', () => {
  // ランダムな HMM を生成：状態数 2～4、観測系列長 3～6
  const N = Math.floor(Math.random() * 3) + 2; // 2..4
  const T = Math.floor(Math.random() * 4) + 3; // 3..6
  // 状態名
  const states = [];
  for (let i = 0; i < N; i++) states.push(`S${i}`);
  vitStatesInput.value = states.join(',');
  // 観測記号は 'o0','o1',... ランダムに選ぶ長さ T
  const observations = [];
  for (let t = 0; t < T; t++) observations.push(`o${t}`);
  vitObsInput.value = observations.join(',');
  // π はランダム確率（合計1に正規化）
  let sumPi = 0;
  const piArr = [];
  for (let i = 0; i < N; i++) {
    const val = Math.random();
    piArr.push(val);
    sumPi += val;
  }
  for (let i = 0; i < N; i++) piArr[i] = +(piArr[i] / sumPi).toFixed(3);
  vitPiInput.value = piArr.join(',');

  // A, B 行列をランダム生成し、正規化してテキストに反映
  // A: N×N、各行正規化
  const Arows = [];
  for (let i = 0; i < N; i++) {
    let rowSum = 0;
    const row = [];
    for (let j = 0; j < N; j++) {
      const val = Math.random();
      row.push(val);
      rowSum += val;
    }
    for (let j = 0; j < N; j++) row[j] = +(row[j] / rowSum).toFixed(3);
    Arows.push(row);
  }
  vitAInput.value = Arows.map(r => r.join(',')).join('\n');

  // B: N×T、各行正規化
  const BrowsArr = [];
  for (let i = 0; i < N; i++) {
    let rowSum = 0;
    const row = [];
    for (let t = 0; t < T; t++) {
      const val = Math.random();
      row.push(val);
      rowSum += val;
    }
    for (let t = 0; t < T; t++) row[t] = +(row[t] / rowSum).toFixed(3);
    BrowsArr.push(row);
  }
  vitBInput.value = BrowsArr.map(r => r.join(',')).join('\n');
});

// =================================================
// 7) 線形計画法（単純形法）
// =================================================
function parseLPinput(text) {
  const lines = text.trim().split('\n').map(l => l.trim()).filter(l => l);
  const objLine = lines.shift();
  const coef = {};
  objLine.replace(/maximize\s*/i, '').split(/\s*\+\s*/).forEach(term => {
    const m = term.match(/([\d]+)([a-zA-Z]+)/);
    if (m) {
      coef[m[2]] = parseInt(m[1], 10);
    }
  });
  const constraints = [];
  for (const line of lines) {
    if (/≤/.test(line) || /<=/.test(line)) {
      const parts = line.replace(/≤/g, '<=').split('<='); 
      const lhs = parts[0].trim();
      const rhs = parts[1].trim();
      const row = {};
      lhs.split(/\s*\+\s*/).forEach(term => {
        const m = term.match(/([\d]+)([a-zA-Z]+)/);
        if (m) row[m[2]] = parseInt(m[1], 10);
      });
      constraints.push({ coef: row, bound: parseInt(rhs, 10) });
    }
  }
  return { obj: coef, cons: constraints };
}

function generateSimplexSteps(lp) {
  const { obj, cons } = lp;
  const vars = Object.keys(obj);
  const m = cons.length;
  const steps = [];

  // 1) 初期単純形表を構築
  const header = [...vars, ...cons.map((_, i) => 's' + (i + 1)), '解', '基底'];
  const table0 = [header];
  for (let i = 0; i < m; i++) {
    const row = [];
    const ci = cons[i];
    for (const v of vars) row.push(ci.coef[v] || 0);
    for (let j = 0; j < m; j++) row.push(i === j ? 1 : 0);
    row.push(ci.bound);
    row.push('s' + (i + 1));
    table0.push(row);
  }
  const objRow = [];
  for (const v of vars) objRow.push(-(obj[v] || 0));
  for (let j = 0; j < m; j++) objRow.push(0);
  objRow.push(0);
  objRow.push('');
  table0.push(objRow);

  steps.push({
    type: 'table',
    table: table0,
    highlight: [],
    message: '初期単純形表（標準形）を構築'
  });

  // 2) 詳細なピボット操作ステップは省略（簡易版）
  steps.push({ type: 'end', message: '（簡易化のため、詳細ピボットステップは省略）' });
  return steps;
}

lpInitBtn.addEventListener('click', () => {
  const txt = lp_input.value.trim();
  if (!txt) {
    alert('LP の定義を入力してください。');
    return;
  }
  clearAutoPlay();
  const lp = parseLPinput(txt);
  steps = generateSimplexSteps(lp);
  currentIndex = 0;

  // テーブル再構築
  while (simplexTable.firstChild) simplexTable.firstChild.remove();
  if (steps.length > 0 && steps[0].type === 'table') {
    const tbl = steps[0].table;
    for (let r = 0; r < tbl.length; r++) {
      const tr = document.createElement('tr');
      for (let c = 0; c < tbl[r].length; c++) {
        const cell = document.createElement(r === 0 ? 'th' : 'td');
        cell.textContent = tbl[r][c];
        tr.appendChild(cell);
      }
      simplexTable.appendChild(tr);
    }
  }
  renderStep();
});

// ランダム生成（LP）
lpRandomBtn.addEventListener('click', () => {
  const txt =
`maximize 3x + 2y
s.t.
 x +  y ≤ 5
2x + 3y ≤ 12
 x ≤ 3
 y ≤ 4`;
  lp_input.value = txt;
});

// =================================================
// 8) ハッシュ法（オープンアドレス法）
// =================================================
function generateOpenAddressingSteps(m, keys) {
  const table = new Array(m).fill(null);
  const steps = [];
  for (const k of keys) {
    let h = k % m;
    let i = 0;
    steps.push({
      type: 'attempt',
      key: k,
      idx: h,
      message: `キー ${k} をハッシュ：h = ${k} mod ${m} = ${h}`
    });
    while (i < m) {
      const slot = (h + i) % m;
      steps.push({
        type: 'probe',
        slot: slot,
        message: `プローブ：idx = (${h} + ${i}) mod ${m} = ${slot}`
      });
      if (table[slot] === null) {
        table[slot] = k;
        steps.push({
          type: 'insert',
          slot: slot,
          key: k,
          message: `挿入：スロット ${slot} に ${k}`
        });
        break;
      } else {
        steps.push({
          type: 'collision',
          slot: slot,
          message: `衝突：スロット ${slot} はすでに ${table[slot]}`
        });
        i++;
      }
    }
    if (i >= m) {
      steps.push({
        type: 'full',
        message: `テーブル満杯：キー ${k} を挿入できませんでした。`
      });
    }
    steps.push({
      type: 'step_end',
      message: `キー ${k} の処理完了`
    });
  }
  steps.push({
    type: 'end',
    message: `すべてのキー挿入完了`
  });
  return { steps, finalTable: table };
}

hashInitBtn.addEventListener('click', () => {
  const m = parseInt(hash_m.value, 10);
  const keysText = hash_keys.value.trim();
  if (isNaN(m) || m < 2) {
    alert('テーブルサイズ m は 2 以上の整数で入力してください。');
    return;
  }
  if (!keysText) {
    alert('キー列を入力してください。');
    return;
  }
  const keys = keysText.split(',').map(s => parseInt(s.trim(), 10)).filter(x => !isNaN(x));
  clearAutoPlay();
  const result = generateOpenAddressingSteps(m, keys);
  steps = result.steps;
  hashTableState = new Array(m).fill(null);
  currentIndex = 0;

  // ハッシュテーブルを再構築
  while (hashContainer.firstChild) hashContainer.firstChild.remove();
  for (let i = 0; i < m; i++) {
    const slot = document.createElement('div');
    slot.classList.add('hash-slot', 'empty');
    slot.id = `hash-slot-${i}`;
    slot.textContent = '';
    hashContainer.appendChild(slot);
  }
  renderStep();
});

hashRandomBtn.addEventListener('click', () => {
  const m = Math.floor(Math.random() * 7) + 5;  // 5～11
  const count = Math.floor(Math.random() * (m - 1)) + 1;
  const keys = [];
  for (let i = 0; i < count; i++) {
    keys.push(Math.floor(Math.random() * 50) + 1);
  }
  hash_m.value = m.toString();
  hash_keys.value = keys.join(',');
  while (hashContainer.firstChild) hashContainer.firstChild.remove();
  for (let i = 0; i < m; i++) {
    const slot = document.createElement('div');
    slot.classList.add('hash-slot', 'empty');
    slot.id = `hash-slot-${i}`;
    hashContainer.appendChild(slot);
  }
  hashTableState = new Array(m).fill(null);
});

/** ハッシュテーブルのスロットを再描画 */
function renderHashTable(table, highlightSlot, confirmedSlots) {
  for (let i = 0; i < table.length; i++) {
    const slotElem = document.getElementById(`hash-slot-${i}`);
    if (!slotElem) continue;
    slotElem.className = 'hash-slot';
    if (table[i] === null) {
      slotElem.classList.add('empty');
      slotElem.textContent = '';
    } else {
      slotElem.textContent = table[i];
    }
    if (highlightSlot === i) {
      slotElem.classList.add('highlight');
    }
    if (confirmedSlots.includes(i)) {
      slotElem.classList.add('confirmed');
    }
  }
}

// =================================================
// renderStep：各アルゴリズムのステップを表示
// =================================================
function renderStep() {
  if (!steps || steps.length === 0 || currentIndex < 0 || currentIndex >= steps.length) {
    updateProgress();
    return;
  }
  const step = steps[currentIndex];

  // まずすべてのハイライトをクリア
  clearDistinctHighlights('#editTable');
  clearDistinctHighlights('#knapTable');
  clearDistinctHighlights('#sortBars');
  clearDistinctHighlights('#searchBars');
  clearDistinctHighlights('#fwdTable');
  clearDistinctHighlights('#vitTable');
  clearDistinctHighlights('#simplexTable');
  clearDistinctHighlights('#hashContainer');

  // 1) Edit Distance
  if (editControls.style.display === 'block') {
    if (step.type === 'cell') {
      const cell = document.getElementById(`editTable-cell-${step.i}-${step.j}`);
      if (cell) {
        cell.textContent = step.value;
        cell.classList.add('highlight');
      }
      editDesc.textContent = step.message;
    } else if (step.type === 'end') {
      editDesc.textContent = step.message;
    }
  }

  // 2) Knapsack
  else if (knapControls.style.display === 'block') {
    if (step.type === 'cell') {
      const cell = document.getElementById(`knapTable-cell-${step.i}-${step.j}`);
      if (cell) {
        cell.textContent = step.value;
        cell.classList.add('highlight');
      }
      knapDesc.textContent = step.message;
    } else if (step.type === 'end') {
      knapDesc.textContent = step.message;
    }
  }

  // 3) Sorting
  else if (sortControls.style.display === 'block') {
    if (step.type === 'row') {
      renderBars(sortBars, step.row, step.highlight);
      sortDesc.textContent = step.message;
    }
  }

  // 4) Searching
  else if (searchControls.style.display === 'block') {
    if (step.type === 'idx') {
      highlightSearchCell('#searchBars', step.idx);
      searchDesc.textContent = step.message;
    }
  }

  // 5) Forward アルゴリズム
  else if (forwardControls.style.display === 'block') {
    if (step.type === 'cell') {
      const cell = document.getElementById(`fwdTable-cell-${step.t}-${step.i}`);
      if (cell) {
        cell.textContent = step.value;
        cell.classList.add('highlight');
      }
      fwdDesc.textContent = step.message;
    } else if (step.type === 'end') {
      fwdDesc.textContent = step.message;
    }
  }

  // 6) Viterbi アルゴリズム
  else if (viterbiControls.style.display === 'block') {
    if (step.type === 'compare') {
      // 比較ステップはメッセージのみ更新
      vitDesc.textContent = step.message;
    } else if (step.type === 'cell') {
      const cell = document.getElementById(`vitTable-cell-${step.t}-${step.i}`);
      if (cell) {
        cell.textContent = step.value;
        cell.classList.add('highlight');
      }
      vitDesc.textContent = step.message;
    } else if (step.type === 'end') {
      vitDesc.textContent = step.message;
    }
  }

  // 7) 線形計画法（単純形法）
  else if (lpControls.style.display === 'block') {
    if (step.type === 'table') {
      lpDesc.textContent = step.message;
    } else if (step.type === 'end') {
      lpDesc.textContent = step.message;
    }
  }

  // 8) ハッシュ法（オープンアドレス法）
  else if (hashControls.style.display === 'block') {
    if (step.type === 'attempt') {
      hashDesc.textContent = step.message;
    } else if (step.type === 'probe') {
      renderHashTable(hashTableState, step.slot, []);
      hashDesc.textContent = step.message;
    } else if (step.type === 'insert') {
      hashTableState[step.slot] = step.key;
      renderHashTable(hashTableState, step.slot, [step.slot]);
      hashDesc.textContent = step.message;
    } else if (step.type === 'collision') {
      renderHashTable(hashTableState, step.slot, []);
      hashDesc.textContent = step.message;
    } else if (step.type === 'step_end') {
      hashDesc.textContent = step.message;
    } else if (step.type === 'end') {
      hashDesc.textContent = step.message;
    }
  }

  updateStepButtons();
  updateProgress();
}

// -------------------------------------------------
// クリックイベントのバインディング
// -------------------------------------------------

// 1) Edit Distance
editPrevBtn.addEventListener('click', onPrevStep);
editNextBtn.addEventListener('click', onNextStep);
editAutoBtn.addEventListener('click', toggleAutoPlay);

// 2) Knapsack
knapPrevBtn.addEventListener('click', onPrevStep);
knapNextBtn.addEventListener('click', onNextStep);
knapAutoBtn.addEventListener('click', toggleAutoPlay);

// 3) Sorting
sortPrevBtn.addEventListener('click', onPrevStep);
sortNextBtn.addEventListener('click', onNextStep);
sortAutoBtn.addEventListener('click', toggleAutoPlay);

// 4) Searching
searchPrevBtn.addEventListener('click', onPrevStep);
searchNextBtn.addEventListener('click', onNextStep);
searchAutoBtn.addEventListener('click', toggleAutoPlay);

// 5) Forward
fwdPrevBtn.addEventListener('click', onPrevStep);
fwdNextBtn.addEventListener('click', onNextStep);
fwdAutoBtn.addEventListener('click', toggleAutoPlay);

// 6) Viterbi
vitPrevBtn.addEventListener('click', onPrevStep);
vitNextBtn.addEventListener('click', onNextStep);
vitAutoBtn.addEventListener('click', toggleAutoPlay);

// 7) LP
lpPrevBtn.addEventListener('click', onPrevStep);
lpNextBtn.addEventListener('click', onNextStep);
lpAutoBtn.addEventListener('click', toggleAutoPlay);

// 8) Hash
hashPrevBtn.addEventListener('click', onPrevStep);
hashNextBtn.addEventListener('click', onNextStep);
hashAutoBtn.addEventListener('click', toggleAutoPlay);

// 初期状態：すべて非表示
algoSelect.dispatchEvent(new Event('change'));
