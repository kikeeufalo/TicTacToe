let vezOrdem = true
let scorePlayerUm = 0
let scorePlayerDois = 0
let array = [] //armazena as posições ja jogadas

function verific(y) {
    let iterator = window.document.getElementById(`${y}`)

    if (array.includes(y)) { // verifica se a posição ja foi  jogada
        console.log('posição ja jogada')
    }else {        
        if (vezOrdem) { // player um
            iterator.textContent = 'X'
            vezOrdem = false
            console.log(`player um`)
        }else {//player dois
            iterator.textContent = "O"
            vezOrdem = true
            console.log(`player dois`)
        }
        array.push(y)
    }

    console.log(array)
    verificGanhador()
}

function verificGanhador() {

}