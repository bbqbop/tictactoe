const gameBoard = (function() {
    const gameBoard = []
    const makeMove = function(player, pos) {
        gameBoard[pos - 1] = player;
        displayController.update(gameBoard)
    }
    return {
        makeMove
    }
})();

const player = (function(){
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
        for(let i = 1; i <= 9; i++){
            const field = document.createElement('div');
            field.classList.add(`field${i}`);
            field.addEventListener('click', (e) => {
                const getPlayer = player.currentPlayer()
                const pos = parseInt(e.target.className[5])
                gameBoard.makeMove(getPlayer, pos)
            })
            board.append(field);
        }
    })()
    const update = function(gameBoard) {
        console.log('asjaks')
        const fields = document.querySelectorAll('div[class^="field');
        fields.forEach(field => {
            field.textContent = 'haha'
        })
    }
    return {
        update
    }
})();
