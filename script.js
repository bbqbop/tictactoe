let gameOver = false;

const game = (function() {
    let gameBoard = []

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
            displayController.gameOver(result)
        }
        return result
    }

    const restart = function() {
        gameBoard = []
        displayController.update()
        displayController.toggle()
        player.currentPlayer()
        gameOver = false
    }

    return {
        makeMove,
        restart
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
        if(gameOver) playerSwitch = false;
        const player = playerSwitch ? 'X' : 'O';
        playerSwitch = !playerSwitch;
        return player
    }
    return {currentPlayer}
})()



const displayController = (function() {
    const board = document.querySelector('.gameBoard');
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
            if(gameBoard === undefined){
                field.textContent = ''
                return
            }
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

    // variables for gameOver
    const resultDiv = document.querySelector('.endScreen .result');
        const endScreen = document.querySelector('.endScreen')
        const playAgainBtn = document.querySelector('button.playAgain') 
        playAgainBtn.addEventListener('click', () => {
            game.restart()
            endScreen.classList.toggle('active')
        })
        
    const gameOver = function(result) {      
        resultDiv.textContent = result;
        endScreen.classList.toggle('active')
    } 

    return {
        update,
        toggle, 
        gameOver
    }
})();




