const doisPlayerBtn = window.document.getElementById('btn-1')
const iaPlayerBtn = window.document.getElementById('btn-2')

let vezOrdem = true
let scorePlayerUm = window.document.getElementById('scoreP1')
let scorePlayerDois = window.document.getElementById('scoreP2')
let array = [] //armazena as posições ja jogadas
let controlePartidaGanha = false
let ia = false

let tabuleiro = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

doisPlayerBtn.addEventListener('click', function() {
    valorInicialTroca(true)
    ia = false
    controlePartidaGanha = true
    modoJogo('escolhido')
})

iaPlayerBtn.addEventListener('click', function() {
    valorInicialTroca(true)
    ia = true
    controlePartidaGanha = true
    modoJogo('escolhido')
})

function modoJogo(x) {
    let escolhaModo = window.document.getElementById('play')
    if (x === 'escolhido') {
        escolhaModo.style.backgroundColor = ''
    }else if (x === 'msg') {
        escolhaModo.style.backgroundColor = 'rgba(242, 175, 96, 0.6)'
        setTimeout(() => {
            modoJogo('escolhido')
            mensagens('')
        }, 2000)
    }else {
        escolhaModo.style.backgroundColor = 'rgba(242, 175, 96, 0.4)'
    }
}

function verific(y) {
    let iterator = window.document.getElementById(`${y}`)

    if (controlePartidaGanha) {
        if (array.includes(y)) { // verifica se a posição ja foi jogada
            mensagens('posição ja jogada')
        }else {    
            let jogada = y -1            
            if (vezOrdem) { // player um
                vezOrdem = false
                if (jogada <= 2) { // define o lugar jogado no tabuleiro
                    tabuleiro[0][jogada] = 'X'
                }else if (jogada <= 5) {
                    tabuleiro[1][jogada - 3] = 'X'
                }else {
                    tabuleiro[2][jogada - 6] = 'X'
                }
                
                console.log('')

                iterator.textContent = 'X'
                if (ia) {
                    jogadaIA()
                }
            }else {//player dois
                
                if (!ia) {
                    if (jogada <= 2) {
                        tabuleiro[0][jogada] = 'O'
                    }else if (jogada <= 5) {
                        tabuleiro[1][jogada - 3] = 'O'
                    }else {
                        tabuleiro[2][jogada - 6] = 'O'
                    }
        
                    iterator.textContent = "O"
                    vezOrdem = true
                    console.log(`player dois`)
                }else {
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
    }else {
        mensagens('Escolha um modo', 'aviso')
    }

    verificGanhador()
    console.log(tabuleiro)
}

function jogadaIA() {
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
                },500)
                return combinacao[0]
            }else {
                ganhou = true
                ganhador = true
                setTimeout(() => {
                    mensagens('Player dois venceu!')
                    let s = Number(scorePlayerDois.textContent)
                    scorePlayerDois.textContent = s + 1
                    if (ganhador) {
                        valorInicialTroca()
                    }
            },500)
            }
            return combinacao[0]
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
                return 'empate'
            }
        }
    }
    return null
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

function minimax(newBoard, jogador) { // escolhe a melhor opção de jogada para a ia
    const humano = 'X' // define qual simbolo é o humano
    const ia = 'O'

    let winner = verificGanhador(newBoard)

    if (winner === ia) {
        return { score: 10}
    }else if (winner === humano) {
        return { score: -10}
    }else if (winner === 'empate') {
        return { score: 0}
    }

    let movimentosPossiveis = []

    newBoard.forEach((spot, index) => {
        if (!spot) {
            let movimentos = {}

            movimentos.index = index
            newBoard[index] = jogador

            if (jogador === ia) {
                let resultado = minimax(newBoard, humano)
                movimentos.score = resultado.score
            }else {
                let resultado = minimax(newBoard, ia)
                movimentos.score = resultado.score
            }

            newBoard[index] = ''
            movimentosPossiveis.push(movimentos)
        }
    });

    let bestMove
    if (jogador === ia) {
        let bestScore = -Infinity
        movimentosPossiveis.forEach(movimentos => {
            if (movimentos.score > bestScore) {
                bestScore = movimentos.score
                bestMove = movimentos
            }
        })
    }else {
        let bestScore = Infinity
        movimentosPossiveis.forEach(movimentos => {
            if (movimentos.score < bestScore) {
                bestScore = move.score
                bestMove = movimentos
            }
        })
    }
    return bestMove
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
    }else if (x !== '') {
        msg.textContent = x
        m.appendChild(msg)

        modoJogo('msg')
    }else {
        let esconde = window.document.getElementById('msg')
        m.removeChild(esconde)
    }
}