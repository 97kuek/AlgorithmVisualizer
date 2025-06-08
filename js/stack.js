// js/stack.js

/**
 * スタック用のステップを生成
 * @param {string[]} initialValues
 * @returns {Array} ステップリスト
 */
function generateStackSteps(initialValues) {
  const stack = [];
  const steps = [];
  // 初期化ステップ
  steps.push({
    type: 'render',
    state: [],
    message: `空のスタックを初期化。`
  });
  // 初期値を push
  initialValues.forEach(val => {
    stack.push(val);
    steps.push({
      type: 'push',
      value: val,
      state: stack.slice(),
      message: `push: ${val} をスタックに追加。`
    });
  });
  steps.push({
    type: 'end',
    message: `初期スタック構築完了。`
  });
  return steps;
}

/**
 * スタックを再描画する
 * @param {string[]} state 現在のスタック状態 (下から上への並び)
 */
function renderStack(state) {
  while (stackContainer.firstChild) stackContainer.firstChild.remove();
  // 上から表示するため、配列を逆にループ
  for (let i = state.length - 1; i >= 0; i--) {
    const item = document.createElement('div');
    item.classList.add('stack-item', 'fade-in-up');
    item.textContent = state[i];
    stackContainer.appendChild(item);
  }
}

// 「Initialize」ボタン押下時
stackInitBtn.addEventListener('click', () => {
  const vals = stackValueInput.value.trim();
  const initialValues = vals ? vals.split(',').map(s => s.trim()).filter(s => s) : [];
  clearAutoPlay();
  stackSteps = generateStackSteps(initialValues);
  currentIndex = 0;
  renderStep();
});

// 「Push」ボタン押下時
stackPushBtn.addEventListener('click', () => {
  const val = prompt('Push する値を入力してください:');
  if (val === null || val.trim() === '') return;
  // すでにステップがある場合、その時点の最新スタック状態を取得
  let lastState = [];
  if (stackSteps.length > 0) {
    const lastStep = stackSteps[stackSteps.length - 1];
    lastState = lastStep.state ? lastStep.state.slice() : [];
  }
  // 新しいステップを追加
  lastState.push(val);
  stackSteps.push({
    type: 'push',
    value: val,
    state: lastState.slice(),
    message: `push: ${val} をスタックに追加。`
  });
  stackSteps.push({
    type: 'end',
    state: lastState.slice(),
    message: `現在のスタック: [${lastState.join(', ')}]`
  });
  currentIndex = stackSteps.length - 2; // pushステップを表示
  renderStep();
});

// 「Pop」ボタン押下時
stackPopBtn.addEventListener('click', () => {
  if (stackSteps.length === 0) return;
  // 現在最後の確定状態を取得
  let lastState = [];
  for (let i = stackSteps.length - 1; i >= 0; i--) {
    if (stackSteps[i].state) {
      lastState = stackSteps[i].state.slice();
      break;
    }
  }
  if (lastState.length === 0) {
    alert('スタックは空です。');
    return;
  }
  const popped = lastState.pop();
  stackSteps.push({
    type: 'pop',
    value: popped,
    state: lastState.slice(),
    message: `pop: ${popped} をスタックから削除。`
  });
  stackSteps.push({
    type: 'end',
    state: lastState.slice(),
    message: `現在のスタック: [${lastState.join(', ')}]`
  });
  currentIndex = stackSteps.length - 2;
  renderStep();
});
