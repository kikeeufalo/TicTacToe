const doisPlayerBtn = window.document.getElementById('btn-1')
const iaPlayerBtn = window.document.getElementById('btn-2')

let vezOrdem = true
let scorePlayerUm = window.document.getElementById('scoreP1')
let scorePlayerDois = window.document.getElementById('scoreP2')
let array = [] //armazena as posições ja jogadas
let controlePartidaGanha = false
let ia = false
let checkWinner

let tabuleiro = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

doisPlayerBtn.addEventListener('click', function () {
    valorInicialTroca(true)
    ia = false
    controlePartidaGanha = true
    modoJogo('escolhido')
})

iaPlayerBtn.addEventListener('click', function () {
    valorInicialTroca(true)
    ia = true
    controlePartidaGanha = true
    modoJogo('escolhido')
})

function modoJogo(x) {
    let escolhaModo = window.document.getElementById('play')
    if (x === 'escolhido') {
        escolhaModo.style.backgroundColor = ''
    } else if (x === 'msg') {
        escolhaModo.style.backgroundColor = 'rgba(242, 175, 96, 0.6)'
        setTimeout(() => {
            modoJogo('escolhido')
            mensagens('')
        }, 2000)
    } else {
        escolhaModo.style.backgroundColor = 'rgba(242, 175, 96, 0.4)'
    }
}

function verific(y) {
    let iterator = window.document.getElementById(`${y}`)

    if (controlePartidaGanha) {
        if (array.includes(y)) { // verifica se a posição ja foi jogada
            mensagens('posição ja jogada')
        } else {
            let jogada = y - 1
            if (vezOrdem) { // player um
                vezOrdem = false
                if (jogada <= 2) { // define o lugar jogado no tabuleiro
                    tabuleiro[0][jogada] = 'X'
                } else if (jogada <= 5) {
                    tabuleiro[1][jogada - 3] = 'X'
                } else {
                    tabuleiro[2][jogada - 6] = 'X'
                }


                iterator.textContent = 'X'
                if (ia) {
                    aiMove()
                }
            } else {//player dois

                if (!ia) {
                    if (jogada <= 2) {
                        tabuleiro[0][jogada] = 'O'
                    } else if (jogada <= 5) {
                        tabuleiro[1][jogada - 3] = 'O'
                    } else {
                        tabuleiro[2][jogada - 6] = 'O'
                    }

                    iterator.textContent = "O"
                    vezOrdem = true
                    console.log(`player dois`)
                } else {
                    mensagens('Você esta jogando com IA')
                }

            }
            array.push(y)

            if (ia && !vezOrdem) { // verifica com quem esta sendo jogado
                let i = array.indexOf(y)
                if (i !== -1) {
                    array.splice(i, 1)
                }
            }
        }
    } else {
        mensagens('Escolha um modo', 'aviso')
    }

    verificGanhador()
    console.log(tabuleiro)
}

function jogadaIA() { // uma jogada aleatoria que a 'ia' faz
    let possiveisJogadas = []

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (tabuleiro[x][y] === '') {
                possiveisJogadas.push([x, y])
            }
        }
    }

    if (possiveisJogadas.length > 0) {
        let jogadaAleatoria2 = possiveisJogadas[Math.floor(Math.random() * possiveisJogadas.length)]

        tabuleiro[jogadaAleatoria2[0]][jogadaAleatoria2[1]] = "O"
        console.log(`IA jogou em (${jogadaAleatoria2[0]}, ${jogadaAleatoria2[1]})`)
        possiveisJogadas = []
    }

    setTimeout(() => {
        vezOrdem = true
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {

                if (tabuleiro[x][y] === 'O') {
                    let posicaoArray = tabuleiro[0].concat(tabuleiro[1], tabuleiro[2])

                    for (let i = 0; i <= posicaoArray.length; i++) {
                        let index = i - 1

                        if (posicaoArray[index] === 'O') {
                            let iteratorIA = window.document.getElementById(`${i}`)
                            iteratorIA.textContent = 'O'
                            array.push(i)
                            console.log(array.sort())
                        }
                    }
                }
            }
        }
    }, 500)

}

// -------------------------------------

function minimax(board, isMaximizing) {
    // Verifica se há um vencedor e retorna um valor baseado no resultado
    let winner = checkWinner();
    if (winner === ai) return 1;       // Vitória da IA: pontuação positiva
    if (winner === human) return -1;   // Vitória do humano: pontuação negativa
    if (winner === 'Empate') return 0; // Empate: pontuação neutra

    // IA tenta maximizar a pontuação
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') { // Se a célula está vazia
                    board[i][j] = ai; // Faz o movimento da IA
                    let score = minimax(board, false); // Recursivamente chama minimax para o próximo movimento
                    board[i][j] = ''; // Desfaz o movimento
                    bestScore = Math.max(score, bestScore); // Escolhe o maior valor (o melhor movimento para a IA)
                }
            }
        }
        return bestScore; // Retorna a melhor pontuação encontrada para a IA
    }
    // Jogador tenta minimizar a pontuação
    else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') { // Se a célula está vazia
                    board[i][j] = human; // Faz o movimento do jogador
                    let score = minimax(board, true); // Recursivamente chama minimax para o próximo movimento
                    board[i][j] = ''; // Desfaz o movimento
                    bestScore = Math.min(score, bestScore); // Escolhe o menor valor (o pior para a IA, logo melhor para o humano)
                }
            }
        }
        return bestScore; // Retorna a melhor pontuação encontrada para o humano
    }
}

function aiMove() {
    let bestScore = -Infinity;
    let bestMove;

    // Tenta cada célula vazia no tabuleiro
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') { // Se a célula está vazia
                board[i][j] = ai; // Faz o movimento da IA
                let score = minimax(board, false); // Chama minimax para avaliar o movimento
                board[i][j] = ''; // Desfaz o movimento para testar a próxima posição
                if (score > bestScore) { // Se a pontuação atual for melhor que a anterior
                    bestScore = score; // Atualiza a melhor pontuação
                    bestMove = { i, j }; // Salva o melhor movimento
                }
            }
        }
    }

    // Faz o melhor movimento encontrado
    if (bestMove) {
        makeMove(bestMove.i, bestMove.j, ai);
    }
}

//---------------------------------------





function verificGanhador() {
    let ganhador = false
    let ganhou = false
    const combinacoesPosiveis = [
        //horizontal
        [tabuleiro[0][0], tabuleiro[0][1], tabuleiro[0][2]],
        [tabuleiro[1][0], tabuleiro[1][1], tabuleiro[1][2]],
        [tabuleiro[2][0], tabuleiro[2][1], tabuleiro[2][2]],
        //vertical
        [tabuleiro[0][0], tabuleiro[1][0], tabuleiro[2][0]],
        [tabuleiro[0][1], tabuleiro[1][1], tabuleiro[2][1]],
        [tabuleiro[0][2], tabuleiro[1][2], tabuleiro[2][2]],
        //diagonal
        [tabuleiro[0][0], tabuleiro[1][1], tabuleiro[2][2]],
        [tabuleiro[0][2], tabuleiro[1][1], tabuleiro[2][0]]
    ]



    for (let combinacao of combinacoesPosiveis) { // verifica ganhadores
        if (combinacao[0] !== '' && combinacao[0] === combinacao[1] && combinacao[1] === combinacao[2]) {
            controlePartidaGanha = false
            if (combinacao[0] === 'X') {
                ganhou = true
                ganhador = true

                setTimeout(() => {
                    mensagens('Player um venceu!')
                    let s = Number(scorePlayerUm.textContent)
                    scorePlayerUm.textContent = s + 1
                    if (ganhador) {
                        valorInicialTroca()
                    }
                }, 500)
                return 'X'
            } else {
                ganhou = true
                ganhador = true
                setTimeout(() => {
                    mensagens('Player dois venceu!')
                    let s = Number(scorePlayerDois.textContent)
                    scorePlayerDois.textContent = s + 1
                    if (ganhador) {
                        valorInicialTroca()
                    }
                }, 500)
                return 'O'
            }
        }
    }
    if (!ganhou) {
        if (
            tabuleiro[0][0] !== '' && tabuleiro[0][1] !== '' && tabuleiro[0][2] !== '' &&
            tabuleiro[1][0] !== '' && tabuleiro[1][1] !== '' && tabuleiro[1][2] !== '' &&
            tabuleiro[2][0] !== '' && tabuleiro[2][1] !== '' && tabuleiro[2][2] !== ''
        ) {
            if (!ganhador) {
                setTimeout(() => {
                    mensagens('Deu Velhaa!')
                    valorInicialTroca()
                    ganhador = true
                    ganhou = true
                }, 500)
                return 'Empate'
            }
        }
    }
}

function valorInicialTroca(x) {
    if (x) {
        scorePlayerDois.textContent = 0
        scorePlayerUm.textContent = 0
    }
    controlePartidaGanha = true
    array = []
    vezOrdem = true
    tabuleiro = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    for (let i = 1; i <= 9; i++) {
        let btn = window.document.getElementById(`${i}`)
        btn.textContent = ''
    }
}


function mensagens(x, y) {
    let m = window.document.getElementById('play')
    let msg = document.createElement('p')

    msg.style.color = 'white'
    msg.style.fontWeight = 'bold'
    msg.style.fontSize = '22pt'
    msg.style.display = 'flex'
    msg.style.justifyContent = 'center'
    msg.style.marginTop = '135px'
    msg.style.position = 'absolute'
    msg.style.width = '100%'
    msg.style.textShadow = '0px 0px 5px black'

    msg.id = 'msg'

    if (y === 'aviso') {
        msg.textContent = x
        m.appendChild(msg)
        setTimeout(() => {
            m.removeChild(msg)
        }, 1000)
    } else if (x !== '') {
        msg.textContent = x
        m.appendChild(msg)

        modoJogo('msg')
    } else {
        let esconde = window.document.getElementById('msg')
        m.removeChild(esconde)
    }
}