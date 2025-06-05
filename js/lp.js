// js/lp.js

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
