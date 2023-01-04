import { INVALID_MOVE } from 'boardgame.io/core';
import alertify from 'alertifyjs';
import $ from 'jquery';
import { questionsJS } from '../questions';

var questionList = questionsJS;

export const TicTacToe = {
  setup: () => ({ cells: Array(9).fill(null) }),

  turn: {
    moveLimit: 1,
  },

  moves: {
    clickCell: (G, ctx, id) => {
      if (G.cells[id] !== null) {
        return INVALID_MOVE;
      }
      if (newQuestion()) {
        G.cells[id] = ctx.currentPlayer;
        alertify.success('You got this one!');
      } else {
        alertify.alert(
          'Wrong answer',
          'Sorry, you did not get one this correct. Changing player...'
        );
      }
      $('#turn').text(ctx.turn);
      $('#player').html(
        ctx.currentPlayer == 0
          ? '<img class="icon" src="https://cdn-icons-png.flaticon.com/512/3904/3904469.png"/>'
          : '<img class="icon" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png"/>'
      );
    },
  },

  endIf: (G, ctx) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if (IsDraw(G.cells)) {
      return { draw: true };
    }
  },

  ai: {
    enumerate: (G, ctx) => {
      let moves = [];
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          moves.push({ move: 'clickCell', args: [i] });
        }
      }
      return moves;
    },
  },
};

// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const isRowComplete = (row) => {
    const symbols = row.map((i) => cells[i]);
    return symbols.every((i) => i !== null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some((i) => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
  return cells.filter((c) => c === null).length === 0;
}

// Generate question from question list
function newQuestion() {
  // Generate random index for questions
  var index = getRandomInt(questionList.length);
  if (questionList.length < 1) {
    alert('Out of problems! Reseting...');
    questionList = questionsJS;
    return false;
  }
  var answer = prompt(
    'Answer following question:\n\n' +
      questionList[index][0] +
      '\n\nEnter a letter representing your answer, then click ok.'
  );
  if (answer == null) {
    return false;
  } else {
    answer = answer.toUpperCase();
  }

  if (answer === questionList[index][1]) {
    questionList.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
