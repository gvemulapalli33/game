

function roll(min, max) {
    return Math.floor((Math.random() * (max-min)) + min);
}

class Game {

    constructor(players) {
        this.players = players;
        this.player1Count = 0;
        this.player2Count = 0;
        this.boardState = null;
        this.winner = null;
    }

    draw() {
        return this.player1Count === this.player2Count;
    }

    checkWinner(boardState) {
        let rows = ['1,2,3', '4,5,6', '7,8,9'];
        let cols = ['1,4,7', '2,5,8', '3,6,9'];
        let dia = ['1,5,9', '3,5,7'];

        this.boardState = boardState;
        let possibilities = [...rows, ...cols, ...dia];
        let player1Positions = [];
        let player2Positions = [];

        function getAllPlayerPositions(id, positions) {
            boardState.filter((player, index) => {
                if (player === id) {
                    positions.push(index);
                }
            });
        }

        getAllPlayerPositions(1, player1Positions);
        getAllPlayerPositions(2, player2Positions);

        const checkWinCount = (positions, count) => {
            for (let i = 0; i < positions.length-2; i++) {
                let pair = [];
                for (let j = i; j <= i + 2; j++) {
                    pair.push(positions[j]);
                }
                
                if (possibilities.includes(pair.toString())) {
                    this[count]++;
                }
            }
        }

        let allPostions = [...player1Positions, ...player2Positions];

        if (allPostions.length >= 6) {
            checkWinCount(player1Positions, 'player1Count');
            checkWinCount(player2Positions, 'player2Count');
            if (this.player1Count > this.player2Count) {
                this.winner = this.players[0];
                return this.winner;
            } else if (this.player1Count < this.player2Count) {
                this.winner = this.players[1];
                return this.winner;
            }
        }
    }

    reset() {

    }

    saveBoard() {
        this.winner.saveWinsToStorage(this.boardState);
    }

    playerTurn(id) {
        return this.players.filter((player) => player.id !== id);
    }

    choosePlayer() {
        return this.players[roll(0,2)];
    }

    startGame() {
        return this.choosePlayer();
    }

}

export default Game;