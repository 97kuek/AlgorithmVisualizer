// js/sorting.js

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
    if (highlightIndices.includes(idx)) bar.classList.add('highlight', 'bounce');
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

// 「Initialize」ボタン押下時 (Sorting 用)
sortInitBtn.addEventListener('click', () => {
  const arrText = sortArrayInput.value.trim();
  if (!arrText) {
    alert('ソート対象のリストを入力してください。');
    return;
  }
  const arr = arrText.split(',').map(s => parseInt(s.trim(), 10));
  if (arr.some(isNaN)) {
    alert('形式エラー：数値リストをカンマ区切りで入力してください。');
    return;
  }

  clearAutoPlay();
  const algo = sortAlgoSelect.value;
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
