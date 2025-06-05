// -------------------------------------------------
// 公共関数・ユーティリティ
// -------------------------------------------------

/**
 * ms ミリ秒だけ待つ Promise を返す
 * @param {number} ms ミリ秒
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * すべてのステップ制御ボタンを disabled にする
 */
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

/**
 * 各ステップ操作ボタンを有効／無効化
 */
function updateStepButtons() {
  // Edit Distance
  if (editControls.style.display === 'block' && editSteps.length > 0) {
    editPrevBtn.disabled = (currentIndex <= 0);
    editNextBtn.disabled = (currentIndex >= editSteps.length - 1);
    editAutoBtn.disabled = false;
  }
  // Knapsack
  if (knapControls.style.display === 'block' && knapSteps.length > 0) {
    knapPrevBtn.disabled = (currentIndex <= 0);
    knapNextBtn.disabled = (currentIndex >= knapSteps.length - 1);
    knapAutoBtn.disabled = false;
  }
  // Sorting
  if (sortControls.style.display === 'block' && sortSteps.length > 0) {
    sortPrevBtn.disabled = (currentIndex <= 0);
    sortNextBtn.disabled = (currentIndex >= sortSteps.length - 1);
    sortAutoBtn.disabled = false;
  }
  // Searching
  if (searchControls.style.display === 'block' && searchSteps.length > 0) {
    searchPrevBtn.disabled = (currentIndex <= 0);
    searchNextBtn.disabled = (currentIndex >= searchSteps.length - 1);
    searchAutoBtn.disabled = false;
  }
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
  // LP
  if (lpControls.style.display === 'block' && lpSteps.length > 0) {
    lpPrevBtn.disabled = (currentIndex <= 0);
    lpNextBtn.disabled = (currentIndex >= lpSteps.length - 1);
    lpAutoBtn.disabled = false;
  }
  // Hash
  if (hashControls.style.display === 'block' && hashSteps.length > 0) {
    hashPrevBtn.disabled = (currentIndex <= 0);
    hashNextBtn.disabled = (currentIndex >= hashSteps.length - 1);
    hashAutoBtn.disabled = false;
  }
}

/**
 * 進捗テキストを更新
 */
function updateProgress() {
  if (editControls.style.display === 'block') {
    const total = editSteps.length;
    const current = (currentIndex < 0) ? 0 : (currentIndex + 1);
    editProgress.textContent = `ステップ ${current} / ${total}`;
  }
  if (knapControls.style.display === 'block') {
    const total = knapSteps.length;
    const current = (currentIndex < 0) ? 0 : (currentIndex + 1);
    knapProgress.textContent = `ステップ ${current} / ${total}`;
  }
  if (sortControls.style.display === 'block') {
    const total = sortSteps.length;
    const current = (currentIndex < 0) ? 0 : (currentIndex + 1);
    sortProgress.textContent = `ステップ ${current} / ${total}`;
  }
  if (searchControls.style.display === 'block') {
    const total = searchSteps.length;
    const current = (currentIndex < 0) ? 0 : (currentIndex + 1);
    searchProgress.textContent = `ステップ ${current} / ${total}`;
  }
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
  if (lpControls.style.display === 'block') {
    const total = lpSteps.length;
    const current = (currentIndex < 0) ? 0 : (currentIndex + 1);
    lpProgress.textContent = `ステップ ${current} / ${total}`;
  }
  if (hashControls.style.display === 'block') {
    const total = hashSteps.length;
    const current = (currentIndex < 0) ? 0 : (currentIndex + 1);
    hashProgress.textContent = `ステップ ${current} / ${total}`;
  }
}

/**
 * 自動再生タイマーをクリア（停止）する
 */
function clearAutoPlay() {
  if (autoTimer !== null) {
    clearInterval(autoTimer);
    autoTimer = null;
  }
  // ボタンテキストを「Auto Play」に戻す
  [
    editAutoBtn, knapAutoBtn, sortAutoBtn, searchAutoBtn,
    fwdAutoBtn, vitAutoBtn, lpAutoBtn, hashAutoBtn
  ].forEach(btn => {
    if (btn) btn.textContent = 'Auto Play';
  });
}

/**
 * Auto Play をトグル（再生／一時停止）する
 * 「何倍速」を元に「1000ms ÷ 倍率」を interval に使う
 */
function toggleAutoPlay() {
  let interval, autoBtn, stepsArr;

  // 1) Edit Distance
  if (editControls.style.display === 'block') {
    const speed = parseFloat(editSpeedSelect.value);
    interval = Math.floor(1000 / speed);
    autoBtn = editAutoBtn;
    stepsArr = editSteps;
  }
  // 2) Knapsack
  else if (knapControls.style.display === 'block') {
    const speed = parseFloat(knapSpeedSelect.value);
    interval = Math.floor(1000 / speed);
    autoBtn = knapAutoBtn;
    stepsArr = knapSteps;
  }
  // 3) Sorting
  else if (sortControls.style.display === 'block') {
    const speed = parseFloat(sortSpeedSelect.value);
    interval = Math.floor(1000 / speed);
    autoBtn = sortAutoBtn;
    stepsArr = sortSteps;
  }
  // 4) Searching
  else if (searchControls.style.display === 'block') {
    const speed = parseFloat(searchSpeedSelect.value);
    interval = Math.floor(1000 / speed);
    autoBtn = searchAutoBtn;
    stepsArr = searchSteps;
  }
  // 5) Forward
  else if (forwardControls.style.display === 'block') {
    const speed = parseFloat(fwdSpeedSelect.value);
    interval = Math.floor(1000 / speed);
    autoBtn = fwdAutoBtn;
    stepsArr = forwardSteps;
  }
  // 6) Viterbi
  else if (viterbiControls.style.display === 'block') {
    const speed = parseFloat(vitSpeedSelect.value);
    interval = Math.floor(1000 / speed);
    autoBtn = vitAutoBtn;
    stepsArr = viterbiSteps;
  }
  // 7) LP
  else if (lpControls.style.display === 'block') {
    const speed = parseFloat(lpSpeedSelect.value);
    interval = Math.floor(1000 / speed);
    autoBtn = lpAutoBtn;
    stepsArr = lpSteps;
  }
  // 8) Hash
  else if (hashControls.style.display === 'block') {
    const speed = parseFloat(hashSpeedSelect.value);
    interval = Math.floor(1000 / speed);
    autoBtn = hashAutoBtn;
    stepsArr = hashSteps;
  }
  else {
    return;
  }

  // トグル処理
  if (autoTimer === null) {
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
    clearAutoPlay();
    updateStepButtons();
  }
}

/**
 * 「前へ」ボタンを押したとき
 */
function onPrevStep() {
  if (currentIndex > 0) {
    currentIndex--;
    renderStep();
  }
}

/**
 * 「次へ」ボタンを押したとき
 */
function onNextStep() {
  let stepsArr;
  if (editControls.style.display === 'block')       stepsArr = editSteps;
  else if (knapControls.style.display === 'block')  stepsArr = knapSteps;
  else if (sortControls.style.display === 'block')  stepsArr = sortSteps;
  else if (searchControls.style.display === 'block')stepsArr = searchSteps;
  else if (forwardControls.style.display === 'block')stepsArr = forwardSteps;
  else if (viterbiControls.style.display === 'block')stepsArr = viterbiSteps;
  else if (lpControls.style.display === 'block')     stepsArr = lpSteps;
  else if (hashControls.style.display === 'block')   stepsArr = hashSteps;
  else return;

  if (currentIndex < stepsArr.length - 1) {
    currentIndex++;
    renderStep();
  }
}

// -------------------------------------------------
// 各要素を取得 (ID と紐付け) 
// -------------------------------------------------
const algoSelect       = document.getElementById('algoSelect');

// 1) Edit Distance
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
const editDelayInput    = document.getElementById('edit_delay');
const editSpeedSelect   = document.getElementById('editSpeedSelect');
const editProgress      = document.getElementById('editProgress');

// 2) Knapsack
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
const knapDelayInput    = document.getElementById('knap_delay');
const knapSpeedSelect   = document.getElementById('knapSpeedSelect');
const knapProgress      = document.getElementById('knapProgress');

// 3) Sorting
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
const sortDelayInput    = document.getElementById('sort_delay');
const sortSpeedSelect   = document.getElementById('sortSpeedSelect');
const sortProgress      = document.getElementById('sortProgress');

// 4) Searching
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
const searchDelayInput   = document.getElementById('search_delay');
const searchAlgoSelect   = document.getElementById('searchAlgoSelect');
const searchSpeedSelect  = document.getElementById('searchSpeedSelect');
const searchProgress     = document.getElementById('searchProgress');

// 5) Forward
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

// 6) Viterbi
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

// 7) 線形計画法
const lpControls         = document.getElementById('lpControls');
const lp_input           = document.getElementById('lp_input');
const lpInitBtn          = document.getElementById('lpInitBtn');
const lpRandomBtn        = document.getElementById('lpRandomBtn');
const lpPrevBtn          = document.getElementById('lpPrevBtn');
const lpNextBtn          = document.getElementById('lpNextBtn');
const lpAutoBtn          = document.getElementById('lpAutoBtn');
const simplexTable       = document.getElementById('simplexTable');
const lpDesc             = document.getElementById('lpDesc');
const lpSpeedSelect      = document.getElementById('lpSpeedSelect');
const lpProgress         = document.getElementById('lpProgress');

// 8) ハッシュ法
const hashControls       = document.getElementById('hashControls');
const hash_m             = document.getElementById('hash_m');
const hash_keys          = document.getElementById('hash_keys');
const hashInitBtn        = document.getElementById('hashInitBtn');
const hashRandomBtn      = document.getElementById('hashRandomBtn');
const hashPrevBtn        = document.getElementById('hashPrevBtn');
const hashNextBtn        = document.getElementById('hashNextBtn');
const hashAutoBtn        = document.getElementById('hashAutoBtn');
const hashContainer      = document.getElementById('hashContainer');
const hashDesc           = document.getElementById('hashDesc');
const hashSpeedSelect    = document.getElementById('hashSpeedSelect');
const hashProgress       = document.getElementById('hashProgress');

// -------------------------------------------------
// 各アルゴリズムのステップ配列・現在インデックス・自動再生タイマー
// -------------------------------------------------
let editSteps     = [], knapSteps    = [], sortSteps     = [], searchSteps    = [];
let forwardSteps  = [], viterbiSteps = [], lpSteps       = [], hashSteps      = [];
let currentIndex  = -1;
let autoTimer     = null;

// -------------------------------------------------
// アルゴリズム選択時の表示制御
// -------------------------------------------------
algoSelect.addEventListener('change', () => {
  const val = algoSelect.value;
  // すべて非表示にする
  [
    editControls, knapControls, sortControls, searchControls,
    forwardControls, viterbiControls, lpControls, hashControls
  ].forEach(div => {
    div.style.display = 'none';
  });
  clearAutoPlay();
  disableAllStepButtons();

  // 選択されたものだけ表示
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
// 1) Edit Distance（編集距離）可視化
// =================================================
/**
 * ステップ情報を生成する
 * @param {string} s1
 * @param {string} s2
 * @returns {Array} ステップリスト
 */
function generateEditDistanceSteps(s1, s2) {
  const n = s1.length, m = s2.length;
  const dp = [];
  for (let i = 0; i <= n; i++) dp.push(new Array(m + 1).fill(0));
  const steps = [];

  // dp[0][0] = 0
  dp[0][0] = 0;
  steps.push({
    type: 'cell', i: 0, j: 0, value: 0,
    message: `dp[0][0] = 0 に初期化。空文字→空文字なので操作不要です。`
  });

  // 0列目・0行目を初期化
  for (let i = 1; i <= n; i++) {
    dp[i][0] = i;
    steps.push({
      type: 'cell', i: i, j: 0, value: dp[i][0],
      message: `dp[${i}][0] = ${i} に設定（削除コスト）。「${s1[i-1]}」を削除して空文字にする操作が ${i} 回。`
    });
  }
  for (let j = 1; j <= m; j++) {
    dp[0][j] = j;
    steps.push({
      type: 'cell', i: 0, j: j, value: dp[0][j],
      message: `dp[0][${j}] = ${j} に設定（挿入コスト）。空文字→「${s2[j-1]}」を挿入し続ける操作が ${j} 回。`
    });
  }

  // メインループ
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = (s1[i - 1] === s2[j - 1]) ? 0 : 1;
      const deleteCost = dp[i - 1][j] + 1;
      const insertCost = dp[i][j - 1] + 1;
      const replaceCost = dp[i - 1][j - 1] + cost;
      const minCost = Math.min(deleteCost, insertCost, replaceCost);
      dp[i][j] = minCost;

      let explanation;
      if (cost === 0) {
        explanation = `文字「${s1[i - 1]}」と「${s2[j - 1]}」は同じ (置換コスト=0)。`;
      } else {
        explanation = `文字「${s1[i - 1]}」と「${s2[j - 1]}」は異なる (置換コスト=1)。`;
      }
      explanation += `\n削除: dp[${i - 1}][${j}] + 1 = ${deleteCost} 、挿入: dp[${i}][${j - 1}] + 1 = ${insertCost} 、置換: dp[${i - 1}][${j - 1}] + ${cost} = ${replaceCost}。`;
      explanation += `\n→ 最小値 ${dp[i][j]} を dp[${i}][${j}] に設定。`;

      steps.push({
        type: 'cell', i: i, j: j, value: dp[i][j].toString(),
        message: explanation
      });
    }
  }

  steps.push({
    type: 'end',
    message: `計算完了！ 編集距離は dp[${n}][${m}] = ${dp[n][m]} です。`
  });
  return steps;
}

// 「Initialize」ボタン押下時
editInitBtn.addEventListener('click', () => {
  const s1 = editS1Input.value.trim();
  const s2 = editS2Input.value.trim();
  let delaySec = parseFloat(editDelayInput.value);
  if (!s1 || !s2) {
    alert('文字列1と文字列2を両方入力してください。');
    return;
  }
  if (isNaN(delaySec) || delaySec < 0) delaySec = 0.1;
  editDelay = delaySec * 1000;

  clearAutoPlay();
  editSteps = generateEditDistanceSteps(s1, s2);
  currentIndex = 0;

  // テーブル再構築 (n+1)x(m+1) の DP テーブル ＋ ヘッダー
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
        cell.id = `edit-cell-${i}-${j}`;
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

// 「ランダム生成」ボタン押下時 (Edit Distance 用)
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
/**
 * Knapsack のステップを生成
 * @param {number[]} weights
 * @param {number[]} values
 * @param {number} capacity
 * @returns {Array} ステップリスト
 */
function generateKnapsackSteps(weights, values, capacity) {
  const n = weights.length;
  const W = capacity;
  const dp = [];
  for (let i = 0; i <= n; i++) dp.push(new Array(W + 1).fill(0));
  const steps = [];

  // i=0 の行
  for (let j = 0; j <= W; j++) {
    dp[0][j] = 0;
    steps.push({
      type: 'cell', i: 0, j: j, value: 0,
      message: `品物0個で容量${j}なら価値0。`
    });
  }

  // i=1..n 行を埋める
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= W; j++) {
      if (weights[i - 1] > j) {
        dp[i][j] = dp[i - 1][j];
        steps.push({
          type: 'cell', i: i, j: j, value: dp[i][j],
          message: `品物 ${i} (重さ=${weights[i - 1]}) は容量${j}に入らない → dp[${i}][${j}] = ${dp[i - 1][j]}`
        });
      } else {
        const withoutItem = dp[i - 1][j];
        const withItem = dp[i - 1][j - weights[i - 1]] + values[i - 1];
        if (withoutItem >= withItem) {
          dp[i][j] = withoutItem;
          steps.push({
            type: 'cell', i: i, j: j, value: dp[i][j],
            message:
              `品物 ${i} (重${weights[i - 1]}, 価値${values[i - 1]}) を入れない場合 = ${withoutItem}\n` +
              `入れる場合 = ${withItem}\n→ 最大値 ${withoutItem} を dp[${i}][${j}] に設定。`
          });
        } else {
          dp[i][j] = withItem;
          steps.push({
            type: 'cell', i: i, j: j, value: dp[i][j],
            message:
              `品物 ${i} (重${weights[i - 1]}, 価値${values[i - 1]}) を入れる場合 = ${withItem}\n→ dp[${i}][${j}] = ${withItem}`
          });
        }
      }
    }
  }

  steps.push({
    type: 'end',
    message: `計算完了！ 最大価値は dp[${n}][${W}] = ${dp[n][W]} です。`
  });
  return steps;
}

// 「Initialize」ボタン押下時 (Knapsack 用)
knapInitBtn.addEventListener('click', () => {
  const wText = knapWeightsInput.value.trim();
  const vText = knapValuesInput.value.trim();
  const capText = knapCapacityInput.value.trim();
  let delaySec = parseFloat(knapDelayInput.value);
  if (!wText || !vText || !capText) {
    alert('重み・価値・容量 をすべて入力してください。');
    return;
  }
  const weights = wText.split(',').map(s => parseInt(s.trim(), 10));
  const values = vText.split(',').map(s => parseInt(s.trim(), 10));
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
  if (isNaN(delaySec) || delaySec < 0) delaySec = 0.1;
  knapDelay = delaySec * 1000;

  clearAutoPlay();
  knapSteps = generateKnapsackSteps(weights, values, capacity);
  currentIndex = 0;

  // テーブルを再構築 (行:0..n, 列:0..W)
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
        cell.id = `knap-cell-${i}-${j}`;
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

// 「ランダム生成」ボタン押下時 (Knapsack 用)
knapRandomBtn.addEventListener('click', () => {
  const count = Math.floor(Math.random() * 5) + 3;
  const maxW = Math.floor(Math.random() * 10) + 5;
  const maxV = Math.floor(Math.random() * 10) + 5;
  const weights = [], values = [];
  for (let i = 0; i < count; i++) {
    weights.push(Math.floor(Math.random() * maxW) + 1);
    values.push(Math.floor(Math.random() * maxV) + 1);
  }
  const capacity = Math.floor(weights.reduce((a, b) => a + b, 0) / 2);
  knapWeightsInput.value = weights.join(',');
  knapValuesInput.value = values.join(',');
  knapCapacityInput.value = capacity.toString();
});

// =================================================
// 3) Sorting（ソート）
// =================================================

/**
 * バーをレンダリング
 * @param {HTMLElement} wrapper バーを配置する要素
 * @param {number[]} array 配列
 * @param {number[]} highlightIndices ハイライトするインデックス
 */
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

/**
 * バブルソートのステップを生成
 * @param {number[]} arrInput
 * @returns {Array} ステップリスト
 */
function generateBubbleSortSteps(arrInput) {
  const arr = arrInput.slice();
  const n = arr.length;
  const steps = [];
  steps.push({
    type: 'row',
    row: arr.slice(),
    highlight: [],
    message: `初期配列: [${arr.join(', ')}]\nバブルソートを開始します。`
  });
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({
        type: 'row',
        row: arr.slice(),
        highlight: [j, j + 1],
        message: `比較: インデックス ${j}（値 ${arr[j]}） と ${j + 1}（値 ${arr[j + 1]}）`
      });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          type: 'row',
          row: arr.slice(),
          highlight: [j, j + 1],
          message: `交換: ${arr[j]} と ${arr[j + 1]} → [${arr.join(', ')}]`
        });
      } else {
        steps.push({
          type: 'row',
          row: arr.slice(),
          highlight: [j, j + 1],
          message: `交換不要: ${arr[j]} ≤ ${arr[j + 1]}`
        });
      }
    }
    steps.push({
      type: 'row',
      row: arr.slice(),
      highlight: [],
      message: `パス ${i + 1} 完了: [${arr.join(', ')}]`
    });
  }
  steps.push({
    type: 'row',
    row: arr.slice(),
    highlight: [],
    message: `最終ソート完了: [${arr.join(', ')}]`
  });
  return steps;
}

/**
 * クイックソートのステップを生成
 * @param {number[]} arrInput
 * @returns {Array} ステップリスト
 */
function generateQuickSortSteps(arrInput) {
  const arr = arrInput.slice();
  const steps = [];
  function partition(a, low, high) {
    const pivot = a[high];
    let i = low - 1;
    steps.push({
      type: 'row',
      row: a.slice(),
      highlight: [high],
      message: `パーティション: low=${low}, high=${high}, pivot=${pivot}`
    });
    for (let j = low; j < high; j++) {
      steps.push({
        type: 'row',
        row: a.slice(),
        highlight: [j, high],
        message: `比較: a[${j}]=${a[j]} と pivot=${pivot}`
      });
      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({
          type: 'row',
          row: a.slice(),
          highlight: [i, j],
          message: `交換: a[${i}] と a[${j}] → [${a.join(', ')}]`
        });
      } else {
        steps.push({
          type: 'row',
          row: a.slice(),
          highlight: [j, high],
          message: `交換不要: ${a[j]} ≥ ${pivot}`
        });
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    steps.push({
      type: 'row',
      row: a.slice(),
      highlight: [i + 1, high],
      message: `pivot を正しい位置 ${i + 1} に移動 → [${a.join(', ')}]`
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
    type: 'row',
    row: arr.slice(),
    highlight: [],
    message: `最終ソート完了: [${arr.join(', ')}]`
  });
  return steps;
}

/**
 * マージソートのステップを生成
 * @param {number[]} arrInput
 * @returns {Array} ステップリスト
 */
function generateMergeSortSteps(arrInput) {
  const arr = arrInput.slice();
  const steps = [];
  function merge(a, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = [];
    const R = [];
    for (let i = 0; i < n1; i++) L.push(a[l + i]);
    for (let j = 0; j < n2; j++) R.push(a[m + 1 + j]);
    let i = 0, j = 0, k = l;
    steps.push({
      type: 'row',
      row: a.slice(),
      highlight: [],
      message: `マージ: 左=[${L.join(', ')}], 右=[${R.join(', ')}]`
    });
    while (i < n1 && j < n2) {
      steps.push({
        type: 'row',
        row: a.slice(),
        highlight: [k],
        message: `比較: L[${i}]=${L[i]} と R[${j}]=${R[j]}`
      });
      if (L[i] <= R[j]) {
        a[k] = L[i];
        steps.push({
          type: 'row',
          row: a.slice(),
          highlight: [k],
          message: `配置: ${L[i]} を a[${k}] に`
        });
        i++;
      } else {
        a[k] = R[j];
        steps.push({
          type: 'row',
          row: a.slice(),
          highlight: [k],
          message: `配置: ${R[j]} を a[${k}] に`
        });
        j++;
      }
      k++;
    }
    while (i < n1) {
      a[k] = L[i];
      steps.push({
        type: 'row',
        row: a.slice(),
        highlight: [k],
        message: `残った左 ${L[i]} → a[${k}]`
      });
      i++; k++;
    }
    while (j < n2) {
      a[k] = R[j];
      steps.push({
        type: 'row',
        row: a.slice(),
        highlight: [k],
        message: `残った右 ${R[j]} → a[${k}]`
      });
      j++; k++;
    }
    steps.push({
      type: 'row',
      row: a.slice(),
      highlight: [],
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
    type: 'row',
    row: arr.slice(),
    highlight: [],
    message: `最終ソート完了: [${arr.join(', ')}]`
  });
  return steps;
}

// 「Initialize」ボタン押下時 (Sorting 用)
sortInitBtn.addEventListener('click', () => {
  const arrText = sortArrayInput.value.trim();
  let delaySec = parseFloat(sortDelayInput.value);
  if (!arrText) {
    alert('ソート対象のリストを入力してください。');
    return;
  }
  const arr = arrText.split(',').map(s => parseInt(s.trim(), 10));
  if (arr.some(isNaN)) {
    alert('形式エラー：数値リストをカンマ区切りで入力してください。');
    return;
  }
  if (isNaN(delaySec) || delaySec < 0) delaySec = 0.2;
  sortDelay = delaySec * 1000;

  const algo = sortAlgoSelect.value;
  clearAutoPlay();
  switch (algo) {
    case 'bubble':
      sortSteps = generateBubbleSortSteps(arr);
      break;
    case 'quick':
      sortSteps = generateQuickSortSteps(arr);
      break;
    case 'merge':
      sortSteps = generateMergeSortSteps(arr);
      break;
    case 'insert':
      // 挿入ソートステップ生成
      sortSteps = generateInsertionSortSteps(arr);
      break;
    case 'select':
      sortSteps = generateSelectionSortSteps(arr);
      break;
    default:
      sortSteps = generateBubbleSortSteps(arr);
      break;
  }
  currentIndex = 0;

  // 初期バーを表示
  if (sortSteps.length > 0 && sortSteps[0].row) {
    renderBars(sortBars, sortSteps[0].row, []);
  }

  renderStep();
});

// 「ランダム生成」ボタン押下時 (Sorting 用)
sortRandomBtn.addEventListener('click', () => {
  const size = Math.floor(Math.random() * 14) + 5;
  const maxVal = Math.floor(Math.random() * 90) + 10;
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * maxVal) + 1);
  }
  sortArrayInput.value = arr.join(',');
  renderBars(sortBars, arr, []);
});

// =========================================
// 挿入ソート・選択ソートのステップ関数
// =========================================

/**
 * 挿入ソート (Insertion Sort) のステップを生成
 * @param {number[]} arrInput
 * @returns {Array} ステップリスト
 */
function generateInsertionSortSteps(arrInput) {
  const arr = arrInput.slice();
  const n = arr.length;
  const steps = [];
  steps.push({
    type: 'row',
    row: arr.slice(),
    highlight: [],
    message: `初期配列: [${arr.join(', ')}]\n挿入ソートを開始します。`
  });
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    steps.push({
      type: 'row',
      row: arr.slice(),
      highlight: [i],
      message: `インデックス ${i} の要素 (${key}) を挿入ポイントを探す`
    });
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      steps.push({
        type: 'row',
        row: arr.slice(),
        highlight: [j, j + 1],
        message: `シフト: a[${j}] (${arr[j]}) を a[${j + 1}] に`
      });
      j--;
    }
    arr[j + 1] = key;
    steps.push({
      type: 'row',
      row: arr.slice(),
      highlight: [j + 1],
      message: `挿入: ${key} を a[${j + 1}] に配置`
    });
  }
  steps.push({
    type: 'row',
    row: arr.slice(),
    highlight: [],
    message: `最終ソート完了: [${arr.join(', ')}]`
  });
  return steps;
}

/**
 * 選択ソート (Selection Sort) のステップを生成
 * @param {number[]} arrInput
 * @returns {Array} ステップリスト
 */
function generateSelectionSortSteps(arrInput) {
  const arr = arrInput.slice();
  const n = arr.length;
  const steps = [];
  steps.push({
    type: 'row',
    row: arr.slice(),
    highlight: [],
    message: `初期配列: [${arr.join(', ')}]\n選択ソートを開始します。`
  });
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      steps.push({
        type: 'row',
        row: arr.slice(),
        highlight: [minIdx, j],
        message: `比較: a[${j}] (${arr[j]}) と a[${minIdx}] (${arr[minIdx]})`
      });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          type: 'row',
          row: arr.slice(),
          highlight: [i, minIdx],
          message: `最小値更新: 新しい最小インデックス = ${minIdx}`
        });
      }
    }
    if (i !== minIdx) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        type: 'row',
        row: arr.slice(),
        highlight: [i, minIdx],
        message: `交換: a[${i}] と a[${minIdx}] → [${arr.join(', ')}]`
      });
    } else {
      steps.push({
        type: 'row',
        row: arr.slice(),
        highlight: [i],
        message: `交換不要: すでに a[${i}] が最小`
      });
    }
  }
  steps.push({
    type: 'row',
    row: arr.slice(),
    highlight: [],
    message: `最終ソート完了: [${arr.join(', ')}]`
  });
  return steps;
}

// =================================================
// 4) Searching（線形探索／2分探索／番兵法）
// =================================================

/**
 * 線形探索のステップを生成
 * @param {number[]} arrInput
 * @param {number} key
 * @returns {Array} ステップリスト
 */
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

/**
 * 2分探索のステップを生成
 * @param {number[]} arrInput (ソート済み)
 * @param {number} key
 * @returns {Array} ステップリスト
 */
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
        message: `${arr[mid]} < ${key} → left を ${mid + 1} に更新`
      });
      left = mid + 1;
    } else {
      steps.push({
        type: 'idx', idx: mid,
        message: `${arr[mid]} > ${key} → right を ${mid - 1} に更新`
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

/**
 * 番兵法のステップを生成
 * @param {number[]} arrInput
 * @param {number} key
 * @returns {Array} ステップリスト
 */
function generateSentinelSearchSteps(arrInput, key) {
  const arr = arrInput.slice();
  const steps = [];
  const n = arr.length;
  arr.push(key); // 番兵を追加
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
      arr.pop(); // 元に戻す
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

// 「Initialize」ボタン押下時 (Searching 用)
searchInitBtn.addEventListener('click', () => {
  const arrText = searchArrayInput.value.trim();
  const keyText = searchKeyInput.value.trim();
  let delaySec = parseFloat(searchDelayInput.value);
  if (!arrText || !keyText) {
    alert('探索対象配列と探索キーを入力してください。');
    return;
  }
  let arr = arrText.split(',').map(s => parseInt(s.trim(), 10));
  const key = parseInt(keyText, 10);
  if (arr.some(isNaN) || isNaN(key)) {
    alert('形式エラー：配列は数値,数値,…、キーは数値で入力してください。');
    return;
  }
  if (isNaN(delaySec) || delaySec < 0) delaySec = 0.2;
  searchDelay = delaySec * 1000;

  const algo = searchAlgoSelect.value;
  clearAutoPlay();
  switch (algo) {
    case 'linear':
      searchSteps = generateLinearSearchSteps(arr, key);
      break;
    case 'binary':
      arr.sort((a, b) => a - b);
      searchSteps = generateBinarySearchSteps(arr, key);
      break;
    case 'sentinel':
      searchSteps = generateSentinelSearchSteps(arr, key);
      break;
    default:
      searchSteps = [];
  }
  currentIndex = 0;

  renderBars(searchBars, arr, []);
  renderStep();
});

// 「ランダム生成」ボタン押下時 (Searching 用)
searchRandomBtn.addEventListener('click', () => {
  const size = Math.floor(Math.random() * 14) + 5;
  const maxVal = Math.floor(Math.random() * 90) + 10;
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * maxVal) + 1);
  }
  arr.sort((a, b) => a - b);
  const key = arr[Math.floor(Math.random() * arr.length)];
  searchArrayInput.value = arr.join(',');
  searchKeyInput.value = key.toString();
  renderBars(searchBars, arr, []);
});

// =================================================
// 5) Forward アルゴリズム（HMM）
// =================================================

/**
 * Forward 用のステップを生成
 * @param {string[]} states
 * @param {string[]} observations
 * @param {number[]} pi
 * @param {number[][]} A
 * @param {number[][]} B
 * @returns {Object} { steps: Array, alphaMatrix: Array }
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

// =================================================
// 6) Viterbi アルゴリズム（HMM）
// =================================================

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
            `t=${t} 比較: δ[${t - 1}][${i}] (${delta[t - 1][i].toFixed(5)}) × a[${i}→${j}] (${A[i][j]}) = ${(val).toFixed(5)}`
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
  return { steps, deltaMatrix: delta, psiMatrix: psi };
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

// =================================================
// 7) 線形計画法（単純形法）
// =================================================

/**
 * LP 入力をパースしてオブジェクト化する
 * 形式（例）：
 * maximize 3x + 2y
 * s.t.
 *  x +  y ≤ 5
 * 2x + 3y ≤ 12
 *  x ≤ 3
 *  y ≤ 4
 *
 * @param {string} text
 * @returns {Object} { obj: {変数:係数}, cons: [{coef:{変数:係数}, bound:数値}, ...] }
 */
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

/**
 * 単純形表を構築し、ステップを生成
 * ここでは「初期単純形表の構築」のみを可視化し、
 * 詳細なピボットステップは省略した簡易版とする
 *
 * @param {Object} lp { obj: {変数:係数}, cons: [{coef:{変数:係数}, bound:数値}] }
 * @returns {Array} ステップリスト
 */
function generateSimplexSteps(lp) {
  const { obj, cons } = lp;
  const vars = Object.keys(obj);
  const m = cons.length;
  const steps = [];

  // 初期単純形表を構築
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

  steps.push({ type: 'end', message: '（簡易化のため、詳細なピボットステップは省略）' });
  return steps;
}

// 「Initialize」ボタン押下時 (LP 用)
lpInitBtn.addEventListener('click', () => {
  const txt = lp_input.value.trim();
  if (!txt) {
    alert('LP の定義を入力してください。');
    return;
  }
  clearAutoPlay();
  const lp = parseLPinput(txt);
  lpSteps = generateSimplexSteps(lp);
  currentIndex = 0;

  // テーブル再構築
  while (simplexTable.firstChild) simplexTable.firstChild.remove();
  if (lpSteps.length > 0 && lpSteps[0].type === 'table') {
    const tbl = lpSteps[0].table;
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

// 「ランダム生成」ボタン押下時 (LP 用)
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

/**
 * オープンアドレス法 (リニアプロービング) のステップを生成
 * @param {number} m テーブルサイズ
 * @param {number[]} keys キー列
 * @returns {Object} { steps: Array, finalTable: Array }
 */
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
      message: `キー ${k} をハッシュ: h = ${k} mod ${m} = ${h}`
    });
    while (i < m) {
      const slot = (h + i) % m;
      steps.push({
        type: 'probe',
        slot: slot,
        message: `プローブ: idx = (${h} + ${i}) mod ${m} = ${slot}`
      });
      if (table[slot] === null) {
        table[slot] = k;
        steps.push({
          type: 'insert',
          slot: slot,
          key: k,
          message: `挿入: スロット ${slot} に ${k}`
        });
        break;
      } else {
        steps.push({
          type: 'collision',
          slot: slot,
          message: `衝突: スロット ${slot} はすでに ${table[slot]}`
        });
        i++;
      }
    }
    if (i >= m) {
      steps.push({
        type: 'full',
        message: `テーブル満杯: キー ${k} を挿入できませんでした。`
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

// 「Initialize」ボタン押下時 (Hash 用)
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
  const keys = keysText
    .split(',')
    .map(s => parseInt(s.trim(), 10))
    .filter(x => !isNaN(x));
  clearAutoPlay();
  const result = generateOpenAddressingSteps(m, keys);
  hashSteps = result.steps;
  hashTableState = new Array(m).fill(null);
  currentIndex = 0;

  // ハッシュテーブルを初期化して表示
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

// 「ランダム生成」ボタン押下時 (Hash 用)
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

/**
 * ハッシュテーブルのスロットを再描画する
 * @param {Array} table 現在のテーブル状態 (null or キー)
 * @param {number} highlightSlot 現在ハイライトするスロット
 * @param {number[]} confirmedSlots 確定として色を変えるスロット
 */
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
    if (i === highlightSlot) {
      slotElem.classList.add('highlight');
    }
    if (confirmedSlots.includes(i)) {
      slotElem.classList.add('confirmed');
    }
  }
}

// -------------------------------------------------
// renderStep：各アルゴリズムのステップを表示
// -------------------------------------------------
function renderStep() {
  // 1) 全部のハイライトをクリア
  document.querySelectorAll('.trellis-table td').forEach(td => {
    td.classList.remove('highlight', 'confirmed');
    Array.from(td.children).forEach(child => {
      if (child.classList.contains('circle') || child.classList.contains('value-label')) {
        td.removeChild(child);
      }
    });
  });
  document.querySelectorAll('.bar').forEach(bar => {
    bar.classList.remove('highlight', 'confirmed');
  });
  document.querySelectorAll('.hash-slot').forEach(slot => {
    slot.classList.remove('highlight', 'confirmed', 'empty');
    if (slot.textContent === '') slot.classList.add('empty');
  });
  while (simplexTable.firstChild && false) {
    // シンプル表は再描画しない (ステップ時に一度のみ構築)
  }

  // ■ Edit Distance
  if (editControls.style.display === 'block') {
    if (editSteps.length === 0) return;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= editSteps.length) currentIndex = editSteps.length - 1;
    const step = editSteps[currentIndex];
    if (step.type === 'cell') {
      const cell = document.getElementById(`edit-cell-${step.i}-${step.j}`);
      if (cell) {
        cell.classList.add('highlight');
        // 値ラベル
        const lbl = document.createElement('div');
        lbl.classList.add('value-label');
        lbl.textContent = step.value;
        cell.appendChild(lbl);
      }
      editDesc.textContent = step.message;
    } else if (step.type === 'end') {
      editDesc.textContent = step.message;
    }
    updateStepButtons();
    updateProgress();
  }

  // ■ Knapsack
  else if (knapControls.style.display === 'block') {
    if (knapSteps.length === 0) return;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= knapSteps.length) currentIndex = knapSteps.length - 1;
    const step = knapSteps[currentIndex];
    if (step.type === 'cell') {
      const cell = document.getElementById(`knap-cell-${step.i}-${step.j}`);
      if (cell) {
        cell.classList.add('highlight');
        const lbl = document.createElement('div');
        lbl.classList.add('value-label');
        lbl.textContent = step.value;
        cell.appendChild(lbl);
      }
      knapDesc.textContent = step.message;
    } else if (step.type === 'end') {
      knapDesc.textContent = step.message;
    }
    updateStepButtons();
    updateProgress();
  }

  // ■ Sorting
  else if (sortControls.style.display === 'block') {
    if (sortSteps.length === 0) return;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= sortSteps.length) currentIndex = sortSteps.length - 1;
    const step = sortSteps[currentIndex];
    if (step.type === 'row') {
      renderBars(sortBars, step.row, step.highlight);
      sortDesc.textContent = step.message;
    }
    updateStepButtons();
    updateProgress();
  }

  // ■ Searching
  else if (searchControls.style.display === 'block') {
    if (searchSteps.length === 0) return;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= searchSteps.length) currentIndex = searchSteps.length - 1;
    const step = searchSteps[currentIndex];
    if (step.type === 'idx') {
      // 前回のハイライトをクリア
      const bars = searchBars.querySelectorAll('.bar');
      bars.forEach(bar => bar.classList.remove('highlight'));
      if (step.idx >= 0 && step.idx < bars.length) {
        bars[step.idx].classList.add('highlight');
      }
      searchDesc.textContent = step.message;
    }
    updateStepButtons();
    updateProgress();
  }

  // ■ Forward
  else if (forwardControls.style.display === 'block') {
    if (forwardSteps.length === 0) return;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= forwardSteps.length) currentIndex = forwardSteps.length - 1;
    const step = forwardSteps[currentIndex];
    if (step.type === 'cell') {
      const cell = document.getElementById(`fwd-cell-${step.t}-${step.i}`);
      if (cell) {
        cell.classList.add('highlight');
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

  // ■ Viterbi
  else if (viterbiControls.style.display === 'block') {
    if (viterbiSteps.length === 0) return;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= viterbiSteps.length) currentIndex = viterbiSteps.length - 1;
    const step = viterbiSteps[currentIndex];
    if (step.type === 'compare') {
      vitDesc.textContent = step.message;
    } else if (step.type === 'cell') {
      const cell = document.getElementById(`vit-cell-${step.t}-${step.i}`);
      if (cell) {
        cell.classList.add('highlight');
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

  // ■ LP
  else if (lpControls.style.display === 'block') {
    if (lpSteps.length === 0) return;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= lpSteps.length) currentIndex = lpSteps.length - 1;
    const step = lpSteps[currentIndex];
    if (step.type === 'table') {
      lpDesc.textContent = step.message;
    } else if (step.type === 'end') {
      lpDesc.textContent = step.message;
    }
    updateStepButtons();
    updateProgress();
  }

  // ■ Hash
  else if (hashControls.style.display === 'block') {
    if (hashSteps.length === 0) return;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= hashSteps.length) currentIndex = hashSteps.length - 1;
    const step = hashSteps[currentIndex];
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
    updateStepButtons();
    updateProgress();
  }
}

// -------------------------------------------------
// クリックイベントのバインド
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

// 初期状態：何も表示しない
algoSelect.dispatchEvent(new Event('change'));
