import { Client } from 'boardgame.io/client';
import { TicTacToe } from './Game';
import party from 'party-js';
import alertify from 'alertifyjs';

class TicTacToeClient {
  constructor(rootElement) {
    this.client = Client({ game: TicTacToe });
    this.client.debugOpt = false;
    this.client.start();
    this.rootElement = rootElement;
    this.createBoard();
    this.attachListeners();
    this.client.subscribe((state) => this.update(state));
  }

  createBoard() {
    // Create cells in rows for the Tic-Tac-Toe board.
    const rows = [];
    for (let i = 0; i < 3; i++) {
      const cells = [];
      for (let j = 0; j < 3; j++) {
        const id = 3 * i + j;
        cells.push(`<td class="cell" data-id="${id}"></td>`);
      }
      rows.push(`<tr>${cells.join('')}</tr>`);
    }

    // Add the HTML to our app <div>.
    // We’ll use the empty <p> to display the game winner later.
    this.rootElement.innerHTML = `
      <table>${rows.join('')}</table>
      <p class="winner"></p>
    `;
  }

  attachListeners() {
    // Attach event listeners to the board cells.
    const cells = this.rootElement.querySelectorAll('.cell');
    // This event handler will read the cell id from the cell’s
    // `data-id` attribute and make the `clickCell` move.
    const handleCellClick = (event) => {
      const id = parseInt(event.target.dataset.id);
      this.client.moves.clickCell(id);
    };
    cells.forEach((cell) => {
      cell.onclick = handleCellClick;
    });
  }

  update(state) {
    // Get all the board cells.
    const cells = this.rootElement.querySelectorAll('.cell');
    // Update cells to display the values in game state.
    cells.forEach((cell) => {
      const cellId = parseInt(cell.dataset.id);
      const cellValue = state.G.cells[cellId];
      if (cellValue !== null) {
        var url = '';
        if (cellValue == 0) {
          url =
            'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png';
        } else {
          url = 'https://cdn-icons-png.flaticon.com/512/3904/3904469.png';
        }
        cell.innerHTML = '<img class="icon" src="' + url + '" />';
        cell.className = 'cell-disabled';
      } else {
        cell.textContent = '';
      }
    });
    // Get the gameover message element.
    const messageEl = this.rootElement.querySelector('.winner');
    // Update the element to show a winner if any.
    if (state.ctx.gameover) {
      if (state.ctx.gameover.winner !== undefined) {
        var imgUrl =
          state.ctx.gameover.winner == 0
            ? 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png'
            : 'https://cdn-icons-png.flaticon.com/512/3904/3904469.png';
        alertify.alert(
          'Game ended!',
          '<h4 id="winnerH4">The winner is <img class="icon" src="' +
            imgUrl +
            '" /></h4>'
        );
        for (var i = 0; i < 3; i++) {
          party.confetti(that.document.getElementById('winnerH4'));
        }
      } else {
        alertify.alert('Game ended!', '<h4>Draw!</h4>');
      }
    } else {
      messageEl.textContent = '';
    }
  }
}

const appElement = document.getElementById('app');
const app = new TicTacToeClient(appElement);
