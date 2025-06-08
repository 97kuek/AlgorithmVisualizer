// js/hashOpen.js

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
  return { steps: steps, finalTable: table };
}

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
      slotElem.classList.add('highlight', 'highlight-anim');
    }
    if (confirmedSlots.includes(i)) {
      slotElem.classList.add('confirmed');
    }
  }
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
