const doisPlayerBtn = window.document.getElementById('btn-1')
const iaPlayerBtn = window.document.getElementById('btn-2')

let vezOrdem = true
let scorePlayerUm = window.document.getElementById('scoreP1')
let scorePlayerDois = window.document.getElementById('scoreP2')
let array = [] //armazena as posições ja jogadas
let controlePartidaGanha = true
let ia = false

let tabuleiro = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

doisPlayerBtn.addEventListener('click', function() {
    valorInicialTroca(true)
    ia = false
})

iaPlayerBtn.addEventListener('click', function() {
    valorInicialTroca(true)
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
                vezOrdem = false
                if (jogada <= 2) { // define o lugar jogado no tabuleiro
                    tabuleiro[0][jogada] = 'X'
                }else if (jogada <= 5) {
                    tabuleiro[1][jogada - 3] = 'X'
                }else {
                    tabuleiro[2][jogada - 6] = 'X'
                }
    
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
                    alert(`Você esta jogando com IA`)
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
        alert('A partida acabou!')
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



    for (let combinacao of combinacoesPosiveis) {
        if (combinacao[0] !== '' && combinacao[0] === combinacao[1] && combinacao[1] === combinacao[2]) {
            controlePartidaGanha = false
            if (combinacao[0] === 'X') {
                ganhou = true
                ganhador = true

                setTimeout(() => {
                    alert(`Player um ganhou`)
                    let s = Number(scorePlayerUm.textContent)
                    scorePlayerUm.textContent = s + 1
                    if (ganhador) {
                        valorInicialTroca()
                    }
                },500)
            }else {
                ganhou = true
                ganhador = true
                setTimeout(() => {
                    alert(`player dois ganhou`)
                    let s = Number(scorePlayerDois.textContent)
                    scorePlayerDois.textContent = s + 1
                    if (ganhador) {
                        valorInicialTroca()
                    }
            },500)
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
                    alert('Deu Velhaa!')
                    valorInicialTroca()
                    ganhador = true
                    ganhou = true
                }, 500)
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

    alert('Recomeçando...')
}