let gameOver = true;

const game = (function() {
    let gameBoard = []
    let threes;

    const makeMove = function(curPlayer, pos) {
        if(gameBoard[pos]) {
            player.currentPlayer()
            return;
        }
        gameBoard[pos] = curPlayer;
        finishMove(pos)
    }

    const compMove = function() {
        if(gameOver) return
        displayController.toggle()
        let posChoice;
        setTimeout( ()=> {
            if(threes){
                threes.forEach(row => {
                    if(row[0] === row[1] && row[0] !== undefined && row[1] !== undefined){
                        posChoice = row[2]
                        console.log(row[2])
                        return
                    }
                })
            }
            choice : 
            for (i = 1; i <= 9; i++){
                posChoice = Math.floor(Math.random() * 9)
                if ( gameBoard[posChoice] === undefined ) {
                    const getPlayer = player.currentPlayer()
                    makeMove(getPlayer, posChoice)
                    displayController.toggle()
                    break choice
                }}
        },1000)
    }

    const finishMove = function(pos) {
        displayController.update(gameBoard, pos)
        isGameOver()
    }

    const isGameOver = function(){
        threes = [[gameBoard[0], gameBoard[1], gameBoard[2]],
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
            displayController.gameOverScreen(result)
        }
        return result
    }

    const start = function() {
        gameBoard = []
        displayController.update(gameBoard)
        displayController.toggle()
        player.currentPlayer()
        gameOver = false
    }

    return {
        makeMove,
        compMove,
        start
        }
})();



const player = (function(){
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
        for (let i = 0; i < 9; i++) {
            const field = document.createElement('div');
            field.classList.add(`field${i}`);
            board.append(field);
        }
    })()

    const fields = document.querySelectorAll('div[class^="field');
    let fieldSwitch = false;

    function atClick(event) {
        const getPlayer = player.currentPlayer()
        const pos = parseInt(event.target.className[5])
        game.makeMove(getPlayer, pos)
        game.compMove()
    }

    const update = function(gameBoard, lastPos) {
        if(lastPos >= 0) fields[lastPos].classList.add('active')
        fields.forEach(field => {
            if(gameOver) field.classList.remove('active')
            const pos = parseInt(field.className[5])
            field.textContent = gameBoard[pos]
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

    // variables for startGame

    const startScreen = document.querySelector('.startScreen')
    const h1 = document.querySelector('.startScreen h1')
    const btnX = document.querySelector('button#btnX')
    const btnO = document.querySelector('button#btnO')
    const toggleMenu = function() {
        startScreen.classList.toggle('active')
        board.classList.toggle('blur')
    }

    toggleMenu();

    btnX.addEventListener('click', ()=> {
        toggleMenu();
        game.start()
    })
    btnO.addEventListener('click', () => {
        toggleMenu();
        game.start()
        game.compMove();
    })

    const gameOverScreen = function(result) {      
        h1.textContent = result;
        toggleMenu()
    } 

    return {
        update,
        toggle, 
        gameOverScreen
    }
})();




