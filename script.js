const game = (function() {
    const gameBoard = []
    let gameOver = false;
    const makeMove = function(curPlayer, pos) {
        if(gameBoard[pos -1]) {
            player.currentPlayer()
            return;
        }
        gameBoard[pos - 1] = curPlayer;
        finishMove()
        compMove()
    }
    const compMove = function() {
        if(gameOver) return
        displayController.toggle()
        setTimeout( ()=> {
            choice : 
            for (i = 1; i <= 9; i++){
                const posChoice = Math.floor(Math.random() * 9)
                if(gameBoard[posChoice] === undefined) {
                    gameBoard[posChoice] = 'O'
                    finishMove()
                    player.currentPlayer()
                    displayController.toggle()
                    break choice
                }}
        },1000)
    }
    const finishMove = function() {
        displayController.update(gameBoard)
        const gameEnd = isGameOver()
        if(gameEnd) alert(gameEnd)
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
        let result;
        // Check for win  
        threes.forEach(row => {
            if (row[0] != undefined && row[0] === row[1] && row[1] === row[2]){
                result = `${row[0]} Wins`
            }
        })
        // Check for draw
        if(threes.every(row => {
            return row[0] != row[1] && row[0] != undefined && row[1] != undefined || 
                    row[0] != row[2] && row[0] != undefined && row[2] != undefined || 
                    row[1] != row[2] && row[1] != undefined && row[2] != undefined
            })){
            result = 'DRAW'
        }
        if(result) {
            gameOver = true;
            displayController.toggle()
        }
        return result
    }


    return {
        makeMove,
        gameOver
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
            field.addEventListener('click', atClick)
            board.append(field);
        }
    })()
    const fields = document.querySelectorAll('div[class^="field');
    let fieldSwitch = true;
    function atClick(event) {
        const getPlayer = player.currentPlayer()
        const pos = parseInt(event.target.className[5])
        game.makeMove(getPlayer, pos)
    }
    const update = function(gameBoard) {
        fields.forEach(field => {
            const pos = parseInt(field.className[5])
            field.textContent = gameBoard[pos - 1]
        })
    }
    const toggle = function() {
        if(fieldSwitch){
            fields.forEach (field => {
                field.removeEventListener('click', atClick)
            })
        } else {
            fields.forEach (field => {
                field.addEventListener('click', atClick)
            })
        }
        fieldSwitch = !fieldSwitch;
    }
    return {
        update,
        toggle
    }
})();




