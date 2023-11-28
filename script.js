'use strict';
//                                                           No
// 用户掷骰子 → 生成随机掷骰子 → 显示掷骰子 → 点数是否为 1 ？  →→→→→ 将掷骰子添加到当前分数 → 更新分数
//                                                           ↡
//                                                   No      ↡ Yes
// 用户储存分数 → 将当前分数添加到总分 → 分数 >= 100?  →→→→→  切换用户
//                                          ↡
//                                     当前玩家获胜
//
// 用户重置游戏 → 将所有分数设置为0 → 将用户1设为先发用户

// 选择元素
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score, currentScore, activePlayer, playing;

// 初始化游戏 score = 0，给 dice(骰子) 添加一个 hidden 样式
const init = () => {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// 投掷骰子功能
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.生成随机掷骰子
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2.显示掷骰子
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    // 3.点数是否为 1
    if (dice !== 1) {
      // 不为 1 将掷骰子添加到当前分数
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // 为 1 切换用户
      switchPlayer();
    }
  }
});

// 15:25 - 90% 15:35 - 80% 16:25 - 60%

btnHold.addEventListener('click', function () {
  if (playing) {
    // 将掷骰子添加到当前分数
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];
    // 分数 >= 100
    if (score[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      // 当前用户获胜
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.palyer--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 点击 btnHold 时切换用户
      switchPlayer();
    }
  }
});

// 新开一局游戏
btnNew.addEventListener('click', init);
