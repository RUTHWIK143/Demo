let startTime, updatedTime, difference = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function start() {
  if (!running) {
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(updateDisplay, 10);
    running = true;
  }
}

function pause() {
  if (running) {
    clearInterval(timerInterval);
    difference = new Date().getTime() - startTime;
    running = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  running = false;
  difference = 0;
  display.textContent = "00:00:00";
  laps.innerHTML = "";
}

function updateDisplay() {
  updatedTime = new Date().getTime() - startTime;
  const milliseconds = Math.floor((updatedTime % 1000) / 10);
  const seconds = Math.floor((updatedTime / 1000) % 60);
  const minutes = Math.floor((updatedTime / (1000 * 60)) % 60);

  display.textContent = 
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

function lap() {
  if (running) {
    const li = document.createElement('li');
    li.textContent = display.textContent;
    laps.appendChild(li);
  }
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
