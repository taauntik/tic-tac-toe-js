class TicTacToe {
    constructor() {
        this.gameBoard = document.querySelector('.gameboard');
        this.title = document.getElementById('title');
        this.reset = document.querySelector('.reset');
        this.infoText = 'Circle goes first';
        this.turn = 'circle';
        this.squares = ["", "", "", "", "", "", "", "", ""];

        this.eventHandler = this.eventHandler.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.removeListener = this.removeListener.bind(this);
        this.applyListeners = this.applyListeners.bind(this);
        this.resetHandler = this.resetHandler.bind(this);

        this.start();
    }

    start() {
        const { squares, updateTitle, gameBoard, applyListeners } = this;
        let newSquares = ``;
        squares.forEach((_, index) => {
            newSquares += `<div class="square" id="${index}"></div>`
        })
        updateTitle('first');
        gameBoard.innerHTML = newSquares;
        applyListeners()
    }

    resetHandler() {
        this.gameBoard.innerHTML = '';
        this.start();
    }

    applyListeners() {
        this.gameBoard.addEventListener('click', this.eventHandler);
        this.reset.addEventListener('click', this.resetHandler);
    }

    checkWhoWins() {
        let circleWins, crossWins;
        const 
            { updateTitle, removeListener } = this,
            allSquares = document.querySelectorAll('.square'),
            winningCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

        winningCombos.every(array => {
            if (this.turn === 'circle') {
                circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));
                return !circleWins;
            } else {
                crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'));
                return !crossWins;
            }
        })
        if (circleWins) {
            updateTitle('win');
            removeListener();
            circleWins = undefined;
        } else if (crossWins) {
            updateTitle('win');
            removeListener();
            crossWins = undefined;
        } else {
            this.turn = this.turn === 'circle' ? 'cross' : 'circle';
            updateTitle();
        }
    }

    updateTitle(condition = 'turn') {
        const { turn, title } = this;
        
        switch (condition) {
            case 'turn' :
                title.innerText = `${turn}'s turn`;
                break;

            case 'win':
                title.innerText = `${turn} won`;
                break;

            case 'first' :
                title.innerText = `${turn} goes first`;
                break;

            default :
                break;
        }
    }

    removeListener() {
        this.gameBoard.removeEventListener('click', this.eventHandler);
    }

    eventHandler(e) {
        if (e.target.children.length === 0 && !e.target.className.includes('circle') && !e.target.className.includes('cross')) {
            e.target.innerHTML += `<div class="${this.turn}"></div>`;
            this.checkWhoWins();
        }
    }
}

new TicTacToe();
