// js/common.js

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
    hashPrevBtn, hashNextBtn, hashAutoBtn,
    stackPrevBtn, stackNextBtn,
    queuePrevBtn, queueNextBtn,
    hashChainPrevBtn, hashChainNextBtn
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
  // Hash (Open Addressing)
  if (hashControls.style.display === 'block' && hashSteps.length > 0) {
    hashPrevBtn.disabled = (currentIndex <= 0);
    hashNextBtn.disabled = (currentIndex >= hashSteps.length - 1);
    hashAutoBtn.disabled = false;
  }
  // Stack
  if (stackControls.style.display === 'block' && stackSteps.length > 0) {
    stackPrevBtn.disabled = (currentIndex <= 0);
    stackNextBtn.disabled = (currentIndex >= stackSteps.length - 1);
  }
  // Queue
  if (queueControls.style.display === 'block' && queueSteps.length > 0) {
    queuePrevBtn.disabled = (currentIndex <= 0);
    queueNextBtn.disabled = (currentIndex >= queueSteps.length - 1);
  }
  // Hash Chaining
  if (hashChainControls.style.display === 'block' && hashChainSteps.length > 0) {
    hashChainPrevBtn.disabled = (currentIndex <= 0);
    hashChainNextBtn.disabled = (currentIndex >= hashChainSteps.length - 1);
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
  if (stackControls.style.display === 'block') {
    const total = stackSteps.length;
    const current = (currentIndex < 0) ? 0 : (currentIndex + 1);
    stackProgress.textContent = `ステップ ${current} / ${total}`;
  }
  if (queueControls.style.display === 'block') {
    const total = queueSteps.length;
    const current = (currentIndex < 0) ? 0 : (currentIndex + 1);
    queueProgress.textContent = `ステップ ${current} / ${total}`;
  }
  if (hashChainControls.style.display === 'block') {
    const total = hashChainSteps.length;
    const current = (currentIndex < 0) ? 0 : (currentIndex + 1);
    hashChainProgress.textContent = `ステップ ${current} / ${total}`;
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
  // 8) Hash (Open Addressing)
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
  else if (stackControls.style.display === 'block')  stepsArr = stackSteps;
  else if (queueControls.style.display === 'block')  stepsArr = queueSteps;
  else if (hashChainControls.style.display === 'block') stepsArr = hashChainSteps;
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
const editSpeedSelect   = document.getElementById('editSpeedSelect');
const editProgress      = document.getElementById('editProgress');

// 2) Knapsack
const knapControls       = document.getElementById('knapControls');
const knapInitBtn        = document.getElementById('knapInitBtn');
const knapRandomBtn      = document.getElementById('knapRandomBtn');
const knapPrevBtn        = document.getElementById('knapPrevBtn');
const knapNextBtn        = document.getElementById('knapNextBtn');
const knapAutoBtn        = document.getElementById('knapAutoBtn');
const knapTable          = document.getElementById('knapTable');
const knapDesc           = document.getElementById('knapDesc');
const knapWeightsInput   = document.getElementById('knap_weights');
const knapValuesInput    = document.getElementById('knap_values');
const knapCapacityInput  = document.getElementById('knap_capacity');
const knapSpeedSelect    = document.getElementById('knapSpeedSelect');
const knapProgress       = document.getElementById('knapProgress');

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

// 8) ハッシュ法 (Open Addressing)
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

// 9) Stack
const stackControls      = document.getElementById('stackControls');
const stackValueInput    = document.getElementById('stack_value');
const stackInitBtn       = document.getElementById('stackInitBtn');
const stackPushBtn       = document.getElementById('stackPushBtn');
const stackPopBtn        = document.getElementById('stackPopBtn');
const stackContainer     = document.getElementById('stackContainer');
const stackDesc          = document.getElementById('stackDesc');
const stackPrevBtn       = document.getElementById('stackPrevBtn');
const stackNextBtn       = document.getElementById('stackNextBtn');
const stackProgress      = document.getElementById('stackProgress');

// 10) Queue
const queueControls      = document.getElementById('queueControls');
const queueValueInput    = document.getElementById('queue_value');
const queueInitBtn       = document.getElementById('queueInitBtn');
const queueEnqueueBtn    = document.getElementById('queueEnqueueBtn');
const queueDequeueBtn    = document.getElementById('queueDequeueBtn');
const queueContainer     = document.getElementById('queueContainer');
const queueDesc          = document.getElementById('queueDesc');
const queuePrevBtn       = document.getElementById('queuePrevBtn');
const queueNextBtn       = document.getElementById('queueNextBtn');
const queueProgress      = document.getElementById('queueProgress');

// 11) Hash Chaining
const hashChainControls   = document.getElementById('hashChainControls');
const hashChainSizeInput  = document.getElementById('hashChainSize');
const hashChainKeysInput  = document.getElementById('hashChainKeys');
const hashChainInitBtn    = document.getElementById('hashChainInitBtn');
const hashChainContainer  = document.getElementById('hashChainContainer');
const hashChainDesc       = document.getElementById('hashChainDesc');
const hashChainPrevBtn    = document.getElementById('hashChainPrevBtn');
const hashChainNextBtn    = document.getElementById('hashChainNextBtn');
const hashChainProgress   = document.getElementById('hashChainProgress');

// -------------------------------------------------
// 各アルゴリズムのステップ配列・現在インデックス・自動再生タイマー
// -------------------------------------------------
let editSteps     = [], knapSteps    = [], sortSteps     = [], searchSteps    = [];
let forwardSteps  = [], viterbiSteps = [], lpSteps       = [], hashSteps      = [];
let stackSteps    = [], queueSteps    = [], hashChainSteps = [];
let currentIndex  = -1;
let autoTimer     = null;

// Hash table state (Open Addressing)
let hashTableState = [];

// Hash chaining state
let hashChainState = [];

// -------------------------------------------------
// アルゴリズム選択時の表示制御
// -------------------------------------------------
algoSelect.addEventListener('change', () => {
  const val = algoSelect.value;
  // すべて非表示にする
  [
    editControls, knapControls, sortControls, searchControls,
    forwardControls, viterbiControls, lpControls, hashControls,
    stackControls, queueControls, hashChainControls,
    bgTabs
  ].forEach(div => {
    div.style.display = 'none';
  });
  clearAutoPlay();
  disableAllStepButtons();

  // 背景知識タブを表示
  if (val) {
    bgTabs.style.display = 'block';
  }

  // 選択されたものだけ表示
  if (val === 'edit')        editControls.style.display = 'block';
  else if (val === 'knapsack')knapControls.style.display = 'block';
  else if (val === 'sorting') sortControls.style.display = 'block';
  else if (val === 'searching')searchControls.style.display = 'block';
  else if (val === 'forward') forwardControls.style.display = 'block';
  else if (val === 'viterbi') viterbiControls.style.display = 'block';
  else if (val === 'lp')      lpControls.style.display = 'block';
  else if (val === 'hash')    hashControls.style.display = 'block';
  else if (val === 'stack')   stackControls.style.display = 'block';
  else if (val === 'queue')   queueControls.style.display = 'block';
  else if (val === 'hashChain')hashChainControls.style.display = 'block';
});
