const controller = {};

controller.register = (data) => {
  // Set error message
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
  // Check email
  fetch(`https://api.zerobounce.net/v1/validatewithip?apikey=ae86bb6100d340c589b6ddc204b282f0&email=${data.email}&ipAddress=156.124.12.145`)
    .then(response => response.json()).then(function (response) {
      if (response.status !== "Valid") {
        view.setErrorMessage("email-error", "Please input your email correctly");
      } else {
        if (
          data.userName !== "" &&
          data.email !== "" &&
          data.password !== "" &&
          data.password === data.confirmPassword
        ) {
          model.register(data);
        }
      }
    })
};

controller.login = ({email, password}) => {
  view.setErrorMessage("email-error", email === "" ? "Please enter your email" : "");
  view.setErrorMessage("password-error", password === "" ? "Please enter your password" : "");
  if (email != "" && password != "") {
    model.login({email, password});
  }
};

// 
controller.playGame = () => {
  const X_CLASS = 'x'
  const CIRCLE_CLASS = 'circle'
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
      cell.addEventListener('click', handleClick)
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
  }

  function handleClick(e) {
    const cell = e.target
    const data = {
      createdAt: new Date().toISOString(),
      owner: model.currentUser.email,
      position: dataArr.indexOf(cell)
    }
    console.log(data)
    model.addPosition(data)
    let currentClass
    if (circleTurn == true) {
      currentClass = CIRCLE_CLASS
    } else {
      currentClass = X_CLASS
    }
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
      endGame(false)
    } else if (isDraw()) {
      endGame(true)
    } else {
      swapTurns()
      setBoardHoverClass()
    }
  }

  function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = 'Draw!'
    } else {
      winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
  }

  function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
  }

  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
    console.log(cell)
    console.log(dataArr.indexOf(cell)) 
  }

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

controller.playGame5 = () => {
  const X_CLASS = 'x'
  const CIRCLE_CLASS = 'circle'
  const cellElements = document.querySelectorAll('[data-cell]')
  const board = document.getElementById('board-game')
  const winningMessageElement = document.getElementById('winningMessage')
  const winningMessageTextElement = document.querySelector('[status-messages]')
  let circleTurn = false;
  let arr = [];
  let row, col;
  let rule = 4;
  let cellNumber = 10;

  function startGame() {
    arr = [];
    for (let i = 0; i < cellNumber; i++) {
      let a = [];
      for (let j = 0; j < cellNumber; j++) a[j] = 0;
      arr.push(a);
    }
    console.log(arr)
    circleTurn = false
    cellElements.forEach(cell => {
      cell.classList.remove(X_CLASS)
      cell.classList.remove(CIRCLE_CLASS)
      cell.addEventListener('click', handleClick)
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
  }
  document.getElementById('restartButton').addEventListener('click', startGame)
  startGame()

  function handleClick(e) {
    const cell = e.target
    let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    cell.classList.add(currentClass);
    for (let i = 0; i < cellNumber * cellNumber; i++) {
      if (cellElements[i] == cell) {
        row = Math.floor(i / cellNumber);
        col = i % cellNumber;
        arr[row][col] = currentClass;
      }
    }
    if (checkWin(currentClass)) {
      endGame(false)
    } else if (isDraw()) {
      endGame(true)
    } else {
      circleTurn = !circleTurn;
      setBoardHoverClass()
    }
  }

  function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = 'Draw!'
    } else {
      winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
  }

  function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
  }

  function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    board.classList.add(circleTurn ? CIRCLE_CLASS : X_CLASS)
  }

  function checkWin(currentClass) {
    let r = row, c = col, count = 0;
    while (r > 0 && c > 0) {
      if (arr[r - 1][c - 1] != currentClass) break;
      r--;
      c--;
    }
    while (r < cellNumber && c < cellNumber) {
      if (arr[r][c] == currentClass) {
        count++;
        r++;
        c++;
      } else break;
    }
    if (count >= rule) return true;

    r = row, c = col, count = 0;
    while (r > 0) {
      if (arr[r - 1][c] != currentClass) break;
      r--;
    }
    while (r < cellNumber) {
      if (arr[r][c] == currentClass) {
        count++;
        r++;
      } else break;
    }
    if (count >= rule) return true;

    r = row, c = col, count = 0;
    while (c > 0) {
      if (arr[r][c - 1] != currentClass) break;
      c--;
    }
    while (r < cellNumber && c < cellNumber) {
      if (arr[r][c] == currentClass) {
        count++;
        c++;
      } else break;
    }
    if (count >= rule) return true;

    r = row, c = col, count = 0;
    while (r > 0 && c < cellNumber) {
      if (arr[r - 1][c + 1] != currentClass) break;
      r--;
      c++;
    }
    while (r < cellNumber && c >= 0) {
      if (arr[r][c] == currentClass) {
        count++;
        r++;
        c--;
      } else break;
    }
    if (count >= rule) return true;
  }
}