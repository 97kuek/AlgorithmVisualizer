// js/main.js

/**
 * 各アルゴリズムのステップを表示
 */
function renderStep() {
  // 1) 全ハイライト・既存要素をクリア
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
  while (stackContainer.firstChild) stackContainer.firstChild.remove();
  while (queueContainer.firstChild) queueContainer.firstChild.remove();
  while (hashChainContainer.firstChild) hashChainContainer.firstChild.remove();

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

  // ■ Hash (Open Addressing)
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

  // ■ Stack
  else if (stackControls.style.display === 'block') {
    if (stackSteps.length === 0) return;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= stackSteps.length) currentIndex = stackSteps.length - 1;
    const step = stackSteps[currentIndex];
    if (step.state) {
      renderStack(step.state);
    }
    stackDesc.textContent = step.message;
    updateStepButtons();
    updateProgress();
  }

  // ■ Queue
  else if (queueControls.style.display === 'block') {
    if (queueSteps.length === 0) return;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= queueSteps.length) currentIndex = queueSteps.length - 1;
    const step = queueSteps[currentIndex];
    if (step.state) {
      renderQueue(step.state);
    }
    queueDesc.textContent = step.message;
    updateStepButtons();
    updateProgress();
  }

  // ■ Hash Chaining
  else if (hashChainControls.style.display === 'block') {
    if (hashChainSteps.length === 0) return;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= hashChainSteps.length) currentIndex = hashChainSteps.length - 1;
    const step = hashChainSteps[currentIndex];
    if (step.state) {
      hashChainState = step.state.map(chain => chain.slice());
      renderHashChaining(hashChainState);
    }
    hashChainDesc.textContent = step.message;
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

// 8) Hash (Open Addressing)
hashPrevBtn.addEventListener('click', onPrevStep);
hashNextBtn.addEventListener('click', onNextStep);
hashAutoBtn.addEventListener('click', toggleAutoPlay);

// 9) Stack
stackPrevBtn.addEventListener('click', onPrevStep);
stackNextBtn.addEventListener('click', onNextStep);

// 10) Queue
queuePrevBtn.addEventListener('click', onPrevStep);
queueNextBtn.addEventListener('click', onNextStep);

// 11) Hash Chaining
hashChainPrevBtn.addEventListener('click', onPrevStep);
hashChainNextBtn.addEventListener('click', onNextStep);

// ページ読み込み時: タブ切り替えのスクリプト
document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.getAttribute('data-tab');
    document.getElementById(target).classList.add('active');
  });
});

// 初期状態：何も表示しない & 背景知識タブは非表示
algoSelect.dispatchEvent(new Event('change'));
