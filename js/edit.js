// js/edit.js

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
    type: 'cell', i: 0, j: 0, value: '0',
    message: `dp[0][0] = 0 に初期化。空文字→空文字なので操作不要です。`
  });

  // 0列目・0行目初期化
  for (let i = 1; i <= n; i++) {
    dp[i][0] = i;
    steps.push({
      type: 'cell', i: i, j: 0, value: dp[i][0].toString(),
      message: `dp[${i}][0] = ${i} に設定（削除コスト）。「${s1[i-1]}」を削除して空文字にする操作が ${i} 回。`
    });
  }
  for (let j = 1; j <= m; j++) {
    dp[0][j] = j;
    steps.push({
      type: 'cell', i: 0, j: j, value: dp[0][j].toString(),
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
  if (!s1 || !s2) {
    alert('文字列1と文字列2を両方入力してください。');
    return;
  }

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
