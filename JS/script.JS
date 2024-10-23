let vezOrdem = true
let scorePlayerUm = 0
let scorePlayerDois = 0
let array = [] //armazena as posições ja jogadas
let controlePartidaGanha = true

let tabuleiro = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

function verific(y) {
    let iterator = window.document.getElementById(`${y}`)

    if (controlePartidaGanha) {
        if (array.includes(y)) { // verifica se a posição ja foi jogada
            console.log('posição ja jogada')
        }else {    
            let jogada = y -1    
            if (vezOrdem) { // player um
    
                if (jogada <= 2) { // define o lugar jogado no tabuleiro
                    tabuleiro[0][jogada] = 'X'
                }else if (jogada <= 5) {
                    tabuleiro[1][jogada - 3] = 'X'
                }else {
                    tabuleiro[2][jogada - 6] = 'X'
                }
    
                iterator.textContent = 'X'
                vezOrdem = false
                console.log(`player um`)
            }else {//player dois
    
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
            }
            array.push(y)
        }
    }else {
        alert('A partida acabou!')
    }

    verificGanhador()
    console.log(tabuleiro)
}

function verificGanhador() {
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

    for (let combinacao of combinacoesPosiveis) {
        if (combinacao[0] !== '' && combinacao[0] === combinacao[1] && combinacao[1] === combinacao[2]) {
            controlePartidaGanha = false
            if (combinacao[0 === 'X']) {
                scorePlayerUm += 1
            }else {
                scorePlayerDois += 1
            }
        }
    }
    
}