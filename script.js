const game = (function() {
    const gameBoard = []
    const makeMove = function(curPlayer, pos) {
        if(gameBoard[pos -1]) {
            player.currentPlayer()
            return;
        }
        gameBoard[pos - 1] = curPlayer;
        finishMove()
        setTimeout(compMove,1000)
    }
    const compMove = function() {
        choice : 
        while (true){
            const posChoice = Math.floor(Math.random() * 9)
            if(gameBoard[posChoice] === undefined) {
                gameBoard[posChoice] = 'O'
                finishMove()
                player.currentPlayer()
                break choice
            } 
        }
    }
    const finishMove = function() {
        displayController.update(gameBoard)
        isGameOver()
    }
    const isGameOver = function(){
        const threes = [[gameBoard[0], gameBoard[1], gameBoard[2]],
                        [gameBoard[3], gameBoard[4], gameBoard[5]],
                        [gameBoard[6], gameBoard[7], gameBoard[8]],
                        [gameBoard[0], gameBoard[3], gameBoard[6]],
                        [gameBoard[1], gameBoard[4], gameBoard[7]],
                        [gameBoard[2], gameBoard[5], gameBoard[8]],
                        [gameBoard[0], gameBoard[4], gameBoard[8]],
                        [gameBoard[2], gameBoard[4], gameBoard[6]],
                        ];
        // Check for win  
        threes.forEach(row => {
            if (row[0] != undefined && row[0] === row[1] && row[1] === row[2]){
                console.log(`${row[0]} Wins`)
            }
        });
        // Check for draw
        if(threes.every(row => {
            return row[0] != row[1] && row[0] != undefined && row[1] != undefined || 
                   row[0] != row[2] && row[0] != undefined && row[2] != undefined || 
                   row[1] != row[2] && row[1] != undefined && row[2] != undefined
        })) {
            console.log('DRAW')
        };
    };
    return {
        makeMove,
    }
})();

const player = (function(){
    // const playerChoice = document.querySelectorAll('button');
    // playerChoice.forEach(button => {
    //     button.addEventListener('click', (e) => {
    //         if(e.target.value = 'x') 
    //     })
    // })
    let playerSwitch = true;
    const currentPlayer = function(){
        const player = playerSwitch ? 'X' : 'O';
        playerSwitch = !playerSwitch;
        return player
    }
    return {currentPlayer}
})()

const displayController = (function() {
    const board = document.querySelector('.gameboard');
    const drawFields = (function(){
        for (let i = 1; i <= 9; i++) {
            const field = document.createElement('div');
            field.classList.add(`field${i}`);
            field.addEventListener('click', (e) => {
                const getPlayer = player.currentPlayer()
                const pos = parseInt(e.target.className[5])
                game.makeMove(getPlayer, pos)
            })
            board.append(field);
        }
    })()
    const update = function(gameBoard) {
        const fields = document.querySelectorAll('div[class^="field');
        fields.forEach(field => {
            const pos = parseInt(field.className[5])
            field.textContent = gameBoard[pos - 1]
        })
    }
    return {
        update
    }
})();




