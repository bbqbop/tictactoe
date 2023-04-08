let gameOver = true;
let hardSwitch;
let user;
let comp;

const game = (function() {
    let gameBoard = []
    let threes;

    const makeMove = function(pos) {
        if(gameBoard[pos]) {
            return;
        }
        curPlayer = player.currentPlayer()
        gameBoard[pos] = curPlayer;
        finishMove(pos)
        if (curPlayer != comp){
            compMove()
        }
    }

    const AI = function(row, XO){
        if(row[1][0] === XO && row[1][0] === row[1][1] && row[1][2] === undefined && row[1][0] !== undefined && row[1][1] !== undefined){
            choice = parseInt(row[0][3])
            // console.log(row, choice, XO)
            return choice
        }
        if(row[1][0] === XO && row[1][0] === row[1][2] && row[1][1] === undefined && row[1][0] !== undefined && row[1][2] !== undefined){
            choice = parseInt(row[0][2])
            // console.log(row, choice, XO)
            return choice
        }
        if(row[1][1] === XO && row[1][1] === row[1][2] && row[1][0] === undefined && row[1][1] !== undefined && row[1][2] !== undefined){
            choice = parseInt(row[0][1])
            // console.log(row, choice, XO)
            return choice
        }
    }

    const compMove = function() {
        if(gameOver) return
        displayController.toggle()
        let posChoice;
        // AI-Logic :
        if(Object.keys(threes).length > 0 && hardSwitch){
            if(gameBoard[4] === undefined) {
                posChoice = 4
                // console.log('a', posChoice)
            }
                else{
                Object.entries(threes).forEach((row) => {
                    testChoice = AI(row, comp)
                    posChoice = testChoice >= 0 ? testChoice : posChoice
                    // console.log('b', posChoice)
                })
                if(!(posChoice >= 0)){
                    Object.entries(threes).forEach(row => {
                        testChoice = AI(row, user)
                        posChoice = testChoice >= 0 ? testChoice : posChoice 
                        // console.log('c', posChoice)
                    })
                }
                }
        }
        // Random computer choice
        if(!(posChoice >= 0)){
            choice : 
            for (i = 1; i <= 9; i++){
                posChoice = Math.floor(Math.random() * 9)
                if ( gameBoard[posChoice] === undefined ) {
                    // console.log('d', posChoice)
                    break choice
                }}
        }
        setTimeout( ()=> {
            // console.log('e', posChoice)
            makeMove(posChoice)
            displayController.toggle()
        },1000)
    }

    const finishMove = function(pos) {
        displayController.update(gameBoard, pos)
        isGameOver()
    }

    const isGameOver = function(){
        threes = {r012  :[gameBoard[0], gameBoard[1], gameBoard[2]],
                  r345  :[gameBoard[3], gameBoard[4], gameBoard[5]],
                  r678  :[gameBoard[6], gameBoard[7], gameBoard[8]],
                  r036  :[gameBoard[0], gameBoard[3], gameBoard[6]],
                  r147  :[gameBoard[1], gameBoard[4], gameBoard[7]],
                  r258  :[gameBoard[2], gameBoard[5], gameBoard[8]],
                  r048  :[gameBoard[0], gameBoard[4], gameBoard[8]],
                  r246  :[gameBoard[2], gameBoard[4], gameBoard[6]],
        };
        
        let result;
        // Check for win  
        Object.values(threes).forEach(row => {
            if (row[0] != undefined && row[0] === row[1] && row[1] === row[2]){
                result = `${row[0]} Wins`
            }
        })
        // Check for draw
        if(Object.values(threes).every(row => {
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
        threes = {}
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
        const pos = parseInt(event.target.className[5])
        game.makeMove(pos)
    }

    const update = function(gameBoard, lastPos) {
        if(lastPos >= 0) {
            fields[lastPos].classList.add('active')
            if(gameBoard[lastPos] === user){
                fields[lastPos].classList.add('blue')
            }
        }
        fields.forEach(field => {
            if(gameOver) {
                field.classList.remove('active')
                field.classList.remove('blue')
            }
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
    const aiSwitch = document.querySelector('.switch input')
    const toggleMenu = function() {
        startScreen.classList.toggle('active')
        board.classList.toggle('blur')
    }

    toggleMenu();

    btnX.addEventListener('click', ()=> {
        user = 'X'
        comp = 'O';
        toggleMenu();
        game.start()
    })
    btnO.addEventListener('click', () => {
        user = 'O'
        comp = 'X'; 
        toggleMenu();
        game.start()
        game.compMove();
    })

    aiSwitch.addEventListener('change', (e) => {
        hardSwitch = e.target.checked
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




