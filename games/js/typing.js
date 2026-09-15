

const g = $('#game');
const prompts = [
  'Interfaces become powerful when every detail earns its place.',
  'Curiosity is a useful engineering tool when paired with patient testing.',
  'Good digital experiences make complex ideas easier to explore.',
  'Small experiments can reveal big ideas when you measure what happens.',
  'Clear systems are built by testing details, removing friction, and iterating.'
];

g.innerHTML = `
  <div class="game-hud">
    <div class="hud-item"><span>WPM</span><strong id="wpm">0</strong></div>
    <div class="hud-item"><span>ACCURACY</span><strong id="acc">100%</strong></div>
    <div class="hud-item"><span>TIME</span><strong id="time">0s</strong></div>
    <div class="hud-item"><span>BEST WPM</span><strong id="best">${localStorage.getItem('pk-typing-best') || '—'}</strong></div>
  </div>
  <div class="typing-prompt-wrap">
    <div class="typing-label">TYPE THIS SENTENCE</div>
    <p class="typing-prompt" id="prompt">${prompts[0]}</p>
  </div>
  <div class="typing-progress"><span id="progress"></span></div>
  <textarea class="game-input typing-input" id="input" rows="5" disabled placeholder="Press Start Test to begin typing..."></textarea>
  <div class="game-actions">
    <button class="game-button" id="start" type="button">Start test</button>
    <button class="ghost-button" id="reset" type="button">Reset</button>
  </div>
  <div class="result" id="result" role="status" aria-live="polite">The passage is ready. Start when you are ready.</div>`;

const prompt = $('#prompt');
const input = $('#input');
const wpm = $('#wpm');
const acc = $('#acc');
const time = $('#time');
const progress = $('#progress');
const result = $('#result');
const startButton = $('#start');
let text = prompts[0];
let startedAt = 0;
let timer = null;
let finished = false;

function choosePrompt() {
  let next = prompts[Math.floor(Math.random() * prompts.length)];
  if (prompts.length > 1 && next === text) next = prompts[(prompts.indexOf(next) + 1) % prompts.length];
  return next;
}

function update() {
  if (!startedAt || finished) return;
  const value = input.value;
  const elapsedSeconds = (performance.now() - startedAt) / 1000;
  const elapsedMinutes = Math.max(elapsedSeconds / 60, 1 / 60);
  let correct = 0;
  for (let i = 0; i < value.length; i++) if (value[i] === text[i]) correct++;
  const accuracy = value.length ? Math.round((correct / value.length) * 100) : 100;
  const currentWpm = Math.max(0, Math.round((correct / 5) / elapsedMinutes));
  wpm.textContent = String(currentWpm);
  acc.textContent = `${accuracy}%`;
  time.textContent = `${Math.floor(elapsedSeconds)}s`;
  progress.style.width = `${Math.min(100, (value.length / text.length) * 100)}%`;

  if (value.length > 0 && value[value.length - 1] !== text[value.length - 1]) {
    result.textContent = 'Check the highlighted accuracy metric — you can correct mistakes before finishing.';
  } else if (!value.length) {
    result.textContent = 'Type the sentence exactly as shown above.';
  } else {
    result.textContent = `${text.length - value.length} characters remaining.`;
  }

  if (value.length >= text.length) finish(currentWpm, accuracy);
}

function finish(finalWpm, accuracy) {
  if (finished) return;
  finished = true;
  clearInterval(timer);
  timer = null;
  input.disabled = true;
  startButton.textContent = 'New test';
  const isNew = best('pk-typing-best', finalWpm);
  $('#best').textContent = localStorage.getItem('pk-typing-best') || finalWpm;
  result.textContent = `Finished — ${finalWpm} WPM at ${accuracy}% accuracy.${isNew ? ' New personal best.' : ''}`;
}

function startTest() {
  text = choosePrompt();
  prompt.textContent = text;
  input.value = '';
  input.disabled = false;
  finished = false;
  startedAt = performance.now();
  clearInterval(timer);
  timer = setInterval(update, 200);
  wpm.textContent = '0';
  acc.textContent = '100%';
  time.textContent = '0s';
  progress.style.width = '0%';
  result.textContent = 'Go — type the sentence exactly as displayed.';
  startButton.textContent = 'Restart test';
  input.focus();
}

function reset() {
  clearInterval(timer);
  timer = null;
  startedAt = 0;
  finished = false;
  text = prompts[0];
  prompt.textContent = text;
  input.disabled = true;
  input.value = '';
  wpm.textContent = '0';
  acc.textContent = '100%';
  time.textContent = '0s';
  progress.style.width = '0%';
  startButton.textContent = 'Start test';
  result.textContent = 'The passage is ready. Start when you are ready.';
}

startButton.addEventListener('click', startTest);
$('#reset').addEventListener('click', reset);
input.addEventListener('input', update);
reset();
