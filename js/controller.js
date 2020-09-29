const controller = {};

controller.register = (data) => {
  view.setErrorMessage("user-name-error", data.userName === "" ? "Please input your username" : "");
  view.setErrorMessage("email-error", data.email === "" ? "Please input your email" : "");
  view.setErrorMessage("password-error", data.password === "" ? "Please input your password" : "");
  if (data.confirmPassword === "") {
    view.setErrorMessage("confirm-password-error", "Please input your confirm password");
  } else if (data.confirmPassword !== data.password) {
    view.setErrorMessage("confirm-password-error", "Password did not match");
  } else {
    view.setErrorMessage("confirm-password-error", "");
  }
  fetch(`https://api.zerobounce.net/v1/validatewithip?apikey=ae86bb6100d340c589b6ddc204b282f0&email=${data.email}&ipAddress=156.124.12.145`)
    .then(response => response.json()).then(function (response) {
      if (response.status !== "Valid") {
        view.setErrorMessage("email-error", "Please input your email correctly");
      } else if (
        data.userName !== "" &&
        data.email !== "" &&
        data.password !== "" &&
        data.password === data.confirmPassword
      ) {
        model.register(data);
      }
    })
};

controller.login = ({email, password}) => {
  view.setErrorMessage("email-error", email === "" ? "Please enter your email" : "");
  view.setErrorMessage("password-error", password === "" ? "Please enter your password" : "");
  if (email != "" && password != "") {
    model.login({email, password,});
  }
};
//
controller.playGame = () => {
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  const cellElements = document.querySelectorAll('[data-cell]')
  const board = document.getElementById('board-game-3')
  const winningMessageElement = document.getElementById('winningMessage')
  const restartButton = document.getElementById('restartButton')
  const winningMessageTextElement = document.querySelector('[status-messages]')
  let circleTurn

  const dataArr = Array.from(cellElements)

  startGame()
  restartButton.addEventListener('click', startGame)

  function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
      cell.classList.remove(X_CLASS)
      cell.classList.remove(CIRCLE_CLASS)
      cell.removeEventListener('click', handleClick)
      cell.addEventListener('click', handleClick, {
        once: true
      })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
  }

  function handleClick(e) {
    const cell = e.target
    let currentClass
    if (circleTurn == true) {
      currentClass = CIRCLE_CLASS
    } else {
      currentClass = X_CLASS
    }
    const data = {
      createdAt: new Date().toISOString(),
      owner: model.currentUser.email,
      type: currentClass,
      position: dataArr.indexOf(cell)
    }
    console.log(data)
    model.addPosition(data)
    view.placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
      game.endGame(false)
    } else if (isDraw()) {
      game.endGame(true)
    } else {
      swapTurns()
      setBoardHoverClass()
    }
  }

  function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
  }

  // function placeMark(cell, currentClass) {
  //   cell.classList.add(currentClass)
  //   console.log(cell)
  //   console.log(dataArr.indexOf(cell)) 
  // }

  function swapTurns() {
    circleTurn = !circleTurn
  }

  function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
      board.classList.add(CIRCLE_CLASS)
    } else {
      board.classList.add(X_CLASS)
    }
  }

  function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return cellElements[index].classList.contains(currentClass)
      })
    })
  }
}