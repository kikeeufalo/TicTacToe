const doisPlayerBtn = window.document.getElementById('btn-1')
const iaPlayerBtn = window.document.getElementById('btn-2')

let vezOrdem = true
let scorePlayerUm = 0
let scorePlayerDois = 0
let array = [] //armazena as posições ja jogadas
let controlePartidaGanha = true
let ia = false

let tabuleiro = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

doisPlayerBtn.addEventListener('click', function() {
    valorInicialTroca()
    ia = false
})

iaPlayerBtn.addEventListener('click', function() {
    valorInicialTroca()
    ia = true
})

function verific(y) {
    let iterator = window.document.getElementById(`${y}`)

    if (controlePartidaGanha) {
        if (array.includes(y)) { // verifica se a posição ja foi jogada
            alert('posição ja jogada')
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
                    alert("Você esta jogando com IA")
                }

            }
            array.push(y)

            if (ia && !vezOrdem) { // verifica com que esta sendo jogado
                let i = array.indexOf(y)
                if (i !== -1) {
                    array.splice(i, 1)
                }
            }
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
    
    if (
        tabuleiro[0][0] !== '' && tabuleiro[0][1] !== '' && tabuleiro[0][2] !== '' &&
        tabuleiro[1][0] !== '' && tabuleiro[1][1] !== '' && tabuleiro[1][2] !== '' &&
        tabuleiro[2][0] !== '' && tabuleiro[2][1] !== '' && tabuleiro[2][2] !== ''
    ) {
        setTimeout(() => {
            alert('Deu Velhaa!')
            valorInicialTroca()
        }, 1000)
    }
}

function valorInicialTroca() {
    controlePartidaGanha = true
    array = []
    scorePlayerDois = 0
    scorePlayerUm = 0
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

    alert('Recomeçando...')
}