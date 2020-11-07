import Game from "./game.js";
import Player from './player.js';

class App {

    constructor() {
        this.game = null;
        this.players = [];
        this.currentPlayer = null;
        this.boardState = [...Array(9).fill(0)];

        this.$turn = document.querySelector('.turn');
        this.player1 = document.querySelector('.player1-status .wins');
        this.player2 = document.querySelector('.player2-status .wins');
        this.player1BoardWins = document.querySelector('.player1-status .board-wins');
        this.player2BoardWins = document.querySelector('.player2-status .board-wins');
        this.createPlayers();
        this.showWinBoards();
        this.addEventListeners();
    }

    addEventListeners() {
        document.body.addEventListener('click', (event) => {
            this.play(event);
        });
    }

    createPlayers() {
        let player1 = new Player(1, '⭐');
        let player2 = new Player(2, '💖');
        this.players = [player1, player2];
        this.game = new Game(this.players);
        this.currentPlayer = this.game.startGame();
        this.$turn.innerText= `It's ${this.currentPlayer.token}'s turn`;
    }

    play(event) {
        let {target} = event;
        if (target.classList.contains('child')) {
            if (!target.innerText) {
                target.innerText = this.currentPlayer.token;
                this.boardState[target.id] = this.currentPlayer.id;
            }
            let player = this.game.checkWinner(this.boardState);
            if (player?.id) {
                let winner = player.id === 1 ? 'player1' : `player2`;
                let winCount = this[winner].innerText || 0;
                console.log('winCount', winCount);
                this[winner].innerText = `${++winCount} wins`;
            } else {
                [this.currentPlayer] = this.game.playerTurn(this.currentPlayer.id);
                this.$turn.innerText= `It's ${this.currentPlayer.token}'s turn`;
            }
        }
    }

    showWinBoards() {
        let player1Wins = this.players[0].retrieveWinsFromStorage();
        let player2Wins = this.players[1].retrieveWinsFromStorage();
        this.player1BoardWins.innerHTML = this.constructBoard(player1Wins);
        this.player1BoardWins.innerHTML = this.constructBoard(player2Wins);
    }

    constructBoard(wins) {
        wins.map((win) => {
           let board = win.map((player) => {
                 if (palyer === 1) {
                     player === '⭐';
                 } else {
                     player === '💖';
                 }
                 return (
                    `<div class="saved-child">${player}</div>`
                 );
            }).join('');

            return (
                `<article class="saved-game">${board}</article>`
            );

        }).join('');
    }

}

new App();