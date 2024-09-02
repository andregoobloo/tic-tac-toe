"use strict";

function GameBoard() {
  const squares = document.querySelectorAll(".square");
  const gameSquares = document.querySelector(".game-board");
  const gameStatus = document.querySelector(".game-status");
  const restartBtn = document.querySelector(".restart-btn");

  let board = ["", "", "", "", "", "", "", "", ""];

  const winningArrayOptions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let playerOneTurn = true;

  const updateStatus = function (status) {
    gameStatus.textContent = status;
  };

  const isGameWon = function () {
    for (let conditions of winningArrayOptions) {
      const [a, b, c] = conditions;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        updateStatus(`Player ${playerOneTurn ? "1" : "2"} Wins!`);
        return true;
      }
    }
    // Check if it's a draw
    if (!board.includes("")) {
      updateStatus("Draw!");
      return true;
    }

    return false;
  };

  gameSquares.addEventListener("click", function (e) {
    e.preventDefault();
    const index = e.target.dataset.index;
    if (board[index] !== "" || gameStatus.textContent.includes("Wins")) {
      return;
    }
    if (e.target.tagName === "DIV") {
      board[index] = playerOneTurn ? "X" : "O";
      e.target.textContent = board[index];
      if (isGameWon()) return;
      updateStatus(`Player ${playerOneTurn ? 2 : 1} Turn`);
      playerOneTurn = !playerOneTurn;
    }
  });

  restartBtn.addEventListener("click", function (e) {
    e.preventDefault();
    board = ["", "", "", "", "", "", "", "", ""];
    squares.forEach((square) => (square.textContent = ""));
    playerOneTurn = true;
    updateStatus("Player 1 Turn");
  });
}

GameBoard();
