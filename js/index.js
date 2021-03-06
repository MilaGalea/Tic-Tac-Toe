const board = document.getElementById("board")
const restartButton = document.getElementById("btnRestart")
let currentPlayer = 1
let movesPlayed = 0
let isGameStarted = true

function setCells(board) {
    const cellQuantity = 9
    const cellContent = `
        <div class="main__cell">
            <p class= "main__cell--text"></p>
        </div>
    `

    let aux = ''
    for (let i = 1; i <= cellQuantity; i++) {
        aux += cellContent
    }

    board.innerHTML = aux
}

setCells(board)

function restartGame() {
    for (cell of board.children) {
        cell.children[0].innerHTML = ""
    }
    movesPlayed = 0
    currentPlayer = 1
    isGameStarted = true
}

function checkMove(index, value) {
    const children = board.children

    //Check Row
    if (index >= 0 && index <= 2) {
        if (children[0].children[0].innerHTML === children[1].children[0].innerHTML &&
            children[1].children[0].innerHTML === children[2].children[0].innerHTML &&
            children[2].children[0].innerHTML === children[index].children[0].innerHTML) {
            isGameStarted = false
        }
    } else if (index >= 3 && index <= 5) {
        if (children[3].children[0].innerHTML === children[4].children[0].innerHTML &&
            children[4].children[0].innerHTML === children[5].children[0].innerHTML &&
            children[5].children[0].innerHTML === children[index].children[0].innerHTML) {
            isGameStarted = false
        }
    } else {
        if (children[6].children[0].innerHTML === children[7].children[0].innerHTML &&
            children[7].children[0].innerHTML === children[8].children[0].innerHTML &&
            children[8].children[0].innerHTML === children[index].children[0].innerHTML) {
            isGameStarted = false
        }
    }

    //Check Column
    if (children[0].children[0].innerHTML === children[3].children[0].innerHTML &&
        children[3].children[0].innerHTML === children[6].children[0].innerHTML &&
        children[6].children[0].innerHTML === children[index].children[0].innerHTML) {
        isGameStarted = false
    } else if (children[1].children[0].innerHTML === children[4].children[0].innerHTML &&
        children[4].children[0].innerHTML === children[7].children[0].innerHTML &&
        children[7].children[0].innerHTML === children[index].children[0].innerHTML) {
        isGameStarted = false
    } else if (children[2].children[0].innerHTML === children[5].children[0].innerHTML &&
        children[5].children[0].innerHTML === children[8].children[0].innerHTML &&
        children[8].children[0].innerHTML === children[index].children[0].innerHTML) {
        isGameStarted = false
    }

    //Check Diagonal
    if (children[0].children[0].innerHTML === children[4].children[0].innerHTML &&
        children[4].children[0].innerHTML === children[8].children[0].innerHTML &&
        children[8].children[0].innerHTML === children[index].children[0].innerHTML) {
        isGameStarted = false
    } else if (children[2].children[0].innerHTML === children[4].children[0].innerHTML &&
        children[4].children[0].innerHTML === children[6].children[0].innerHTML &&
        children[6].children[0].innerHTML === children[index].children[0].innerHTML) {
        isGameStarted = false
    }

    if (!isGameStarted) {
        swal({ title: `Gan?? el jugador ${currentPlayer}`, icon: "success" })
    } else if (currentPlayer === 1) {
        currentPlayer++
    } else if (currentPlayer === 2) {
        currentPlayer--
    }
}

function playerClick(cell, index) {
    let value = cell.children[0].innerHTML
    if (isGameStarted && value === "") {
        movesPlayed++
        if (currentPlayer === 1) {
            cell.children[0].innerHTML = 'X'
            checkMove(index, "X")
        } else if (currentPlayer === 2) {
            cell.children[0].innerHTML = 'O'
            checkMove(index, "X")
        }

        if (movesPlayed === 9 && isGameStarted) {
            swal({ title: "Empate", icon: "success" })
            isGameStarted = false
        }
    }
}

function setEventListeners(board) {
    for (let i = 0; i < board.children.length; i++) {
        let cell = board.children[i]
        cell.addEventListener('click', function() {
            playerClick(this, i)
        })
    }
    restartButton.addEventListener('click', function() {
        restartGame()
    })
}

setEventListeners(board)

function setCellStyles() {
    const borderSize = 7
    let borderStyle1 = `border-width: 0 ${borderSize}px ${borderSize}px 0`
    let borderStyle2 = `border-width: 0 0 ${borderSize}px 0`
    let borderStyle3 = `border-width: 0 ${borderSize}px 0 0`

    for (let i = 0; i < board.children.length; i++) {
        switch (i) {
            case 0:
                board.children[i].style = borderStyle1
                break
            case 1:
                board.children[i].style = borderStyle1
                break
            case 2:
                board.children[i].style = borderStyle2
                break
            case 3:
                board.children[i].style = borderStyle1
                break
            case 4:
                board.children[i].style = borderStyle1
                break
            case 5:
                board.children[i].style = borderStyle2
                break
            case 6:
                board.children[i].style = borderStyle3
                break
            case 7:
                board.children[i].style = borderStyle3
                break
        }
    }
}

setCellStyles()