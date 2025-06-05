// js/knapsack.js

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
      type: 'cell', i: 0, j: j, value: '0',
      message: `品物0個で容量${j}なら価値0。`
    });
  }

  // i=1..n 行を埋める
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= W; j++) {
      if (weights[i - 1] > j) {
        dp[i][j] = dp[i - 1][j];
        steps.push({
          type: 'cell', i: i, j: j, value: dp[i][j].toString(),
          message: 
            `品物 ${i} (重さ=${weights[i - 1]}) は容量${j}に入らない → dp[${i}][${j}] = ${dp[i - 1][j]}`
        });
      } else {
        const withoutItem = dp[i - 1][j];
        const withItem = dp[i - 1][j - weights[i - 1]] + values[i - 1];
        if (withoutItem >= withItem) {
          dp[i][j] = withoutItem;
          steps.push({
            type: 'cell', i: i, j: j, value: dp[i][j].toString(),
            message:
              `品物 ${i} (重${weights[i - 1]}, 価値${values[i - 1]}) を入れない場合 = ${withoutItem}\n` +
              `入れる場合 = ${withItem}\n→ 最大値 ${withoutItem} を dp[${i}][${j}] に設定。`
          });
        } else {
          dp[i][j] = withItem;
          steps.push({
            type: 'cell', i: i, j: j, value: dp[i][j].toString(),
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
