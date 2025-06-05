// js/hashChaining.js

/**
 * チェイン法ハッシュのステップを生成
 * @param {number} m テーブルサイズ
 * @param {number[]} keys キー列
 * @returns {Object} { steps: Array, finalState: Array }
 */
function generateHashChainingSteps(m, keys) {
  // テーブルは長さ m の配列で、各要素はリスト（配列）
  const table = Array.from({ length: m }, () => []);
  const steps = [];
  for (const k of keys) {
    const h = k % m;
    steps.push({
      type: 'insert',
      key: k,
      index: h,
      state: table.map(chain => chain.slice()),
      message: `キー ${k} をハッシュ: h = ${k} mod ${m} = ${h}。チェインに追加。`
    });
    table[h].push(k);
    steps.push({
      type: 'end',
      state: table.map(chain => chain.slice()),
      message: `スロット ${h} のチェイン: [${table[h].join(', ')}]`
    });
  }
  steps.push({
    type: 'end',
    state: table.map(chain => chain.slice()),
    message: `すべてのキー挿入完了。`
  });
  return { steps: steps, finalState: table };
}

/**
 * チェイン法ハッシュを再描画する
 * @param {Array[]} state 各スロットのチェイン (2次元配列)
 */
function renderHashChaining(state) {
  while (hashChainContainer.firstChild) hashChainContainer.firstChild.remove();
  state.forEach((chain, idx) => {
    const slotDiv = document.createElement('div');
    slotDiv.classList.add('hash-chain-slot');
    const title = document.createElement('div');
    title.style.fontWeight = '600';
    title.textContent = `Slot ${idx}:`;
    slotDiv.appendChild(title);
    const list = document.createElement('div');
    list.textContent = chain.length > 0 ? chain.join(' → ') : 'EMPTY';
    slotDiv.appendChild(list);
    hashChainContainer.appendChild(slotDiv);
  });
}

// 「Initialize」ボタン押下時 (Hash Chaining 用)
hashChainInitBtn.addEventListener('click', () => {
  const m = parseInt(hashChainSizeInput.value, 10);
  const keysText = hashChainKeysInput.value.trim();
  if (isNaN(m) || m < 1) {
    alert('テーブルサイズ m は 1 以上の整数で入力してください。');
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
  const result = generateHashChainingSteps(m, keys);
  hashChainSteps = result.steps;
  hashChainState = Array.from({ length: m }, () => []);
  currentIndex = 0;

  // 初期表示：空のチェインを描画
  hashChainState = Array.from({ length: m }, () => []);
  renderStep();
});
