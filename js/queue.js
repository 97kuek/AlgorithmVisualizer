// js/queue.js

/**
 * キュー用のステップを生成
 * @param {string[]} initialValues
 * @returns {Array} ステップリスト
 */
function generateQueueSteps(initialValues) {
  const queue = [];
  const steps = [];
  // 初期化ステップ
  steps.push({
    type: 'render',
    state: [],
    message: `空のキューを初期化。`
  });
  // 初期値を enqueue
  initialValues.forEach(val => {
    queue.push(val);
    steps.push({
      type: 'enqueue',
      value: val,
      state: queue.slice(),
      message: `enqueue: ${val} をキューに追加。`
    });
  });
  steps.push({
    type: 'end',
    message: `初期キュー構築完了。`
  });
  return steps;
}

/**
 * キューを再描画する
 * @param {string[]} state 現在のキュー状態 (先頭から末尾)
 */
function renderQueue(state) {
  while (queueContainer.firstChild) queueContainer.firstChild.remove();
  state.forEach(val => {
    const item = document.createElement('div');
    item.classList.add('queue-item');
    item.textContent = val;
    queueContainer.appendChild(item);
  });
}

// 「Initialize」ボタン押下時
queueInitBtn.addEventListener('click', () => {
  const vals = queueValueInput.value.trim();
  const initialValues = vals ? vals.split(',').map(s => s.trim()).filter(s => s) : [];
  clearAutoPlay();
  queueSteps = generateQueueSteps(initialValues);
  currentIndex = 0;
  renderStep();
});

// 「Enqueue」ボタン押下時
queueEnqueueBtn.addEventListener('click', () => {
  const val = prompt('Enqueue する値を入力してください:');
  if (val === null || val.trim() === '') return;
  // すでにステップがある場合、その時点の最新キュー状態を取得
  let lastState = [];
  if (queueSteps.length > 0) {
    const lastStep = queueSteps[queueSteps.length - 1];
    lastState = lastStep.state ? lastStep.state.slice() : [];
  }
  // 新しいステップを追加
  lastState.push(val);
  queueSteps.push({
    type: 'enqueue',
    value: val,
    state: lastState.slice(),
    message: `enqueue: ${val} をキューに追加。`
  });
  queueSteps.push({
    type: 'end',
    state: lastState.slice(),
    message: `現在のキュー: [${lastState.join(', ')}]`
  });
  currentIndex = queueSteps.length - 2; // enqueue ステップを表示
  renderStep();
});

// 「Dequeue」ボタン押下時
queueDequeueBtn.addEventListener('click', () => {
  if (queueSteps.length === 0) return;
  // 現在最後の確定状態を取得
  let lastState = [];
  for (let i = queueSteps.length - 1; i >= 0; i--) {
    if (queueSteps[i].state) {
      lastState = queueSteps[i].state.slice();
      break;
    }
  }
  if (lastState.length === 0) {
    alert('キューは空です。');
    return;
  }
  const dequeued = lastState.shift();
  queueSteps.push({
    type: 'dequeue',
    value: dequeued,
    state: lastState.slice(),
    message: `dequeue: ${dequeued} をキューから取り出し。`
  });
  queueSteps.push({
    type: 'end',
    state: lastState.slice(),
    message: `現在のキュー: [${lastState.join(', ')}]`
  });
  currentIndex = queueSteps.length - 2;
  renderStep();
});
