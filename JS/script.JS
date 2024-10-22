let vezOrdem = true
let scorePlayerUm = 0
let scorePlayerDois = 0

function verific(y) {
    let iterator = window.document.getElementById(`${y}`)
    if (vezOrdem) { // player um
        iterator.textContent = 'X'
        vezOrdem = false
        console.log(`player um`)
    }else {//player dois
        iterator.textContent = "O"
        vezOrdem = true
        console.log(`player dois`)
    }
}