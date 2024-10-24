let board = ['', '', '', '', '', '', '', '', ''];
let human = 'X';
let ai = 'O';
let currentPlayer = human;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function aiMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = ai;
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    board[move] = ai;
    currentPlayer = human;
    createBoard();
    checkWinner(board, ai);
    checkDraw();
}

function minimax(board, depth, isMaximizing) {
    let winner = checkWinner(board, human) || checkWinner(board, ai);
    if (winner === human) return -10 + depth;
    if (winner === ai) return 10 - depth;
    if (checkDraw()) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = ai;
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = human;
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner(board, player) {
    for (let combo of winningCombinations) {
        if (combo.every(index => board[index] === player)) {
            alert(`${player} venceu!`);
            return true;
        }
    }
    return false;
}

function checkDraw() {
    if (board.every(cell => cell !== '')) {
        alert('Empate!');
        return true;
    }
    return false;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = human;
    createBoard();
}

createBoard();