const modeRadios = document.querySelectorAll('input[name="mode"]');
const pvcChoices = document.querySelector('.choices.pvc');
const pvpChoices = document.querySelector('.choices.pvp');
const player1ScoreSpan = document.getElementById('player1-score');
const player2ScoreSpan = document.getElementById('player2-score');
const player2Label = document.getElementById('player2-label');
const resultDiv = document.getElementById('result');
const resetBtn = document.getElementById('reset');

let mode = 'pvc';
let p1Score = 0, p2Score = 0;
let p1Choice = null, p2Choice = null;

modeRadios.forEach(radio => radio.addEventListener('change', e => {
  mode = e.target.value;
  resetRound();
  updateUIForMode();
}));

function updateUIForMode() {
  if (mode === 'pvc') {
    pvcChoices.classList.remove('hidden');
    pvpChoices.classList.add('hidden');
    player2Label.textContent = 'Computer:';
  } else {
    pvcChoices.classList.add('hidden');
    pvpChoices.classList.remove('hidden');
    player2Label.textContent = 'Player 2:';
  }
  resultDiv.textContent = 'Make your move!';
  resetBtn.classList.add('hidden');
}

pvcChoices.addEventListener('click', e => {
  if (!e.target.closest('.choice')) return;
  const userChoice = e.target.closest('.choice').id;
  playPVC(userChoice);
});

pvpChoices.addEventListener('click', e => {
  if (!e.target.classList.contains('choice')) return;
  const who = e.target.classList.contains('p1') ? 'p1' : 'p2';
  if (who === 'p1') {
    p1Choice = e.target.dataset.choice;
    e.target.classList.add('selected');
    resultDiv.textContent = 'Player 2, make your move!';
  } else {
    p2Choice = e.target.dataset.choice;
    e.target.classList.add('selected');
    playPVP();
  }
});

function getComputerChoice() {
  return ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
}

function decideWinner(c1, c2) {
  if (c1 === c2) return 'draw';
  if (
    (c1 === 'rock' && c2 === 'scissors') ||
    (c1 === 'paper' && c2 === 'rock') ||
    (c1 === 'scissors' && c2 === 'paper')
  ) return 'p1';
  return 'p2';
}

function playPVC(userChoice) {
  const compChoice = getComputerChoice();
  const winner = decideWinner(userChoice, compChoice);
  if (winner === 'p1') {
    p1Score++; resultDiv.textContent = `You Win! ${userChoice} beats ${compChoice}`; resultDiv.className = 'result win';
  } else if (winner === 'draw') {
    resultDiv.textContent = `Draw! Both chose ${userChoice}`; resultDiv.className = 'result draw';
  } else {
    p2Score++; resultDiv.textContent = `You Lose! ${compChoice} beats ${userChoice}`; resultDiv.className = 'result lose';
  }
  updateScores();
  resetBtn.classList.remove('hidden');
}

function playPVP() {
  const winner = decideWinner(p1Choice, p2Choice);
  if (winner === 'p1') {
    p1Score++; resultDiv.textContent = `Player 1 Wins! ${p1Choice} beats ${p2Choice}`; resultDiv.className = 'result win';
  } else if (winner === 'draw') {
    resultDiv.textContent = `Draw! Both chose ${p1Choice}`; resultDiv.className = 'result draw';
  } else {
    p2Score++; resultDiv.textContent = `Player 2 Wins! ${p2Choice} beats ${p1Choice}`; resultDiv.className = 'result lose';
  }
  updateScores();
  resetBtn.classList.remove('hidden');
}

function updateScores() {
  player1ScoreSpan.textContent = p1Score;
  player2ScoreSpan.textContent = p2Score;
}

resetBtn.addEventListener('click', () => {
  resetRound();
  resultDiv.textContent = 'Make your move!';
  resultDiv.className = 'result';
  resetBtn.classList.add('hidden');
});

function resetRound() {
  p1Choice = p2Choice = null;
  document.querySelectorAll('.choice.selected').forEach(btn => btn.classList.remove('selected'));
}

updateUIForMode();
