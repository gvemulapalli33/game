class Player {

    constructor(id, token ) {
        this.id = id;
        this.token = token;
        this.wins = localStorage.getItem(`${id}`) || [];
    }

    saveWinsToStorage(boardState) {
       this.wins.push(boardState);
       localStorage.setItem('${id}', JSON.stringify(this.wins));
    }

    retrieveWinsFromStorage() {
       return this.wins;
    }

}

export default Player;