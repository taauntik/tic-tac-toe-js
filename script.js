class TicTacToe {
    constructor() {
        this.gameBoard = document.querySelector('.gameboard');
        this.title = document.getElementById('title');
        this.infoText = 'Circle goes first';
        this.turn = 'circle';
        this.squares = ["", "", "", "", "", "", "", "", ""];
        this.bindEventHanlder = this.eventHandler.bind(this);

        this.start();
    }

    start() {
        let newSquares = ``;
        this.squares.forEach((_, index) => {
            newSquares += `<div class="square" id="${index}"></div>`
        })
        this.title.innerText = this.turn;
        this.gameBoard.innerHTML = newSquares;
        this.applyListeners()
    }

    applyListeners() {
        this.gameBoard.addEventListener('click', this.bindEventHanlder);
    }

    checkWhoWins() {
        const allSquares = document.querySelectorAll('.square');
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]

        let circleWins, crossWins;

        winningCombos.forEach(array => {
            if (this.turn === 'circle') {
                circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));
            } else {
                crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'));
            }
            if (circleWins) {
                this.title.innerText = `${this.turn.toUpperCase()} Wins`;
                this.removeListener();
            } else if (crossWins) {
                this.title.innerText = `${this.turn.toUpperCase()} Wins`;
                this.removeListener();
            }
        })
    }

    removeListener() {
        this.gameBoard.removeEventListener('click', this.bindEventHanlder);
    }

    eventHandler(e) {
        if (e.target.children.length === 0 && !e.target.className.includes(this.turn)) {
            e.target.innerHTML += `<div class="${this.turn}"></div>`;
            this.checkWhoWins();
            this.turn = this.turn === 'circle' ? 'cross' : 'circle';
            this.title.innerText = `${this.turn}'s turn`;
        }
    }
}

new TicTacToe();
