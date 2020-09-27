const view = {};

view.setActiveScreen = async (screenName) => {
  switch (screenName) {
    case "registerPage":
      document.getElementById("app").innerHTML = component.registerPage;
      const registerForm = document.getElementById("register-form");
      registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const data = {
          userName: registerForm.userName.value,
          email: registerForm.email.value,
          password: registerForm.password.value,
          confirmPassword: registerForm.confirmPassword.value,
        };
        controller.register(data);
      });
      document.getElementById("redirect-to-login").addEventListener("click", function () {
        view.setActiveScreen("loginPage");
      });
      break;
    case "loginPage":
      document.getElementById("app").innerHTML = component.loginPage;
      const loginForm = document.getElementById("login-form");
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const data = {
          email: loginForm.email.value,
          password: loginForm.password.value,
        };
        controller.login(data);
      });
      document.getElementById('btn_google').addEventListener('click', function () {
        model.logInWithGoogle();
      })
      document.getElementById('btn_facebook').addEventListener('click', function () {
        model.logInWithFacebook();
      })
      document.getElementById("redirect-to-register").addEventListener("click", function () {
        view.setActiveScreen("registerPage");
      });
      break;
    case "homePage":
      document.getElementById("app").innerHTML = component.homePage;
      const logInButton = document.getElementById("log-in");
      logInButton.addEventListener("click", () => {
        view.setActiveScreen("loginPage");
      });
      const signOutButton = document.getElementById("sign-out");
      signOutButton.addEventListener("click", () => {
        model.setOffline(firebase.auth().currentUser.uid)
        firebase.auth().signOut();
      });
      break;
      //  
    case "gamePage":
      document.getElementById("app").innerHTML = component.gamePage;
      document.getElementById("opt3x3").addEventListener('click', function () {
        view.setActiveScreen("playPage");
      })
      document.getElementById("opt5x5").addEventListener('click', function () {
        game.rule = 4;
        game.size = 5;
        view.setActiveScreen("playPage5");
      })
      document.getElementById("opt10x10").addEventListener('click', function () {
        game.rule = 5;
        game.size = 10;
        view.setActiveScreen("playPage5");
      })

      const rankingBtn = document.querySelector(".ranking")
      const listPlayerBtn = document.querySelector(".player")
      // for (player of model.players) {
      //   console.log(player.id)
      //   document.getElementById(player.id).addEventListener('click', () => {
      //     console.log('click')
      //   })
      // }
      rankingBtn.addEventListener('click', () => {
        listPlayerBtn.classList.remove('current')
        rankingBtn.classList.add('current')
        document.querySelector('.rankingList').style = 'display: block'
        document.querySelector('.playerList').style = 'display: none'
      })

      listPlayerBtn.addEventListener('click', () => {
        rankingBtn.classList.remove('current')
        listPlayerBtn.classList.add('current')
        document.querySelector('.rankingList').style = 'display: none'
        document.querySelector('.playerList').style = 'display: block'
      })



      // console.log(document.querySelectorAll('.btn-invite'))
      const btnSignOut = document.getElementById("sign-out");
      btnSignOut.addEventListener("click", () => {
        model.setOffline(firebase.auth().currentUser.uid)
        firebase.auth().signOut();
      });
      await model.listenPresence()
      await model.getPlayer()
      await model.listenAllPlayer()
      console.log(model.players)
      for (let i = 0; i < model.players.length; i++) {
        // console.log(model.players[i].id)
        // console.log(i)
        // console.log(document.getElementById(model.players[i].id))
        // document.getElementById(model.players[i].id).addEventListener('click', () => {
        //   const inviteMesage = {
        //     createdAt: new Date().toISOString(),
        //     message: model.currentUser.displayName + " invited"
        //   }
        //  model.invitationsPlayer(inviteMesage, model.players[i].id, model.players[i].email)
        // })
      }
      break;
    case "playPage":
      document.getElementById("app").innerHTML = component.playPage;
      model.listenGamesChanges()
      controller.playGame()
      document.getElementById('log-in').style = 'display: none'
      // hidden sign in btn
      break;
    case "playPage5":
      document.getElementById("app").innerHTML = component.playPage5;

      let board = document.getElementById("board-game")
      for (let i = 0; i < game.size * game.size; i++) {
        const cell = document.createElement('div');
        cell.classList.add("cell");
        cell.setAttribute("data-cell", "")
        board.appendChild(cell);
      }
      var sheet = document.createElement('style')
      sheet.innerHTML = `
      #board-game {
          grid-template-columns: repeat(${game.size}, auto);
      }
      #board-game .cell:nth-child(${game.size}n + 1){
          border-left: none;
      }
      #board-game .cell:nth-child(${game.size}n){
          border-right: none;
      }
      #board-game .cell:nth-child(-n + ${game.size}){
          border-top: none;
      }
      #board-game .cell:nth-child(-n + ${game.size * game.size}){
          border-bottom: none;
      }
      `;
      board.appendChild(sheet);
      document.getElementById('restartButton').addEventListener('click', game.startGame)
      game.startGame()
      document.getElementById('log-in').style = 'display: none'
      break;
  }
};

view.setErrorMessage = (elementId, content) => {
  document.getElementById(elementId).innerText = content;
};

//
view.showPlayer = async (childData) => {
  document.querySelector('.aside-right .rankingList').innerHTML = ""
  document.querySelector('.aside-right .playerList').innerHTML = ""

  for (player of model.players) {
    view.addPlayer(player)
    let check = false
    for (let i in childData) {
      if (childData[i].state == "online" && player.id == i) {
        view.addListPlayer(player, true)
        check = true
        break
      }
    }
    if (check) continue
    await view.addListPlayer(player, false)
  }
}

view.addPlayer = (player) => {
  const infoWrapper = document.createElement('div')
  infoWrapper.classList.add('info')
  infoWrapper.innerHTML = `
  <div class="rank"> 1. </div> 
  <div class="user-name"> ${player.owner} </div> 
  <div class="score"> ${player.points} </div>
  `
  document.querySelector('.aside-right .rankingList').appendChild(infoWrapper)
}

view.addListPlayer = (player, online) => {
  const listPlayerWrapper = document.createElement('div')
  listPlayerWrapper.classList.add('info-player')
  if (online) {
    listPlayerWrapper.innerHTML = `
    <div class="player-and-status">
        <div class="name" >${player.owner}</div>
        <span class="status"></span>
    </div>
    <div class="btn-invite" id="${player.id}">Invite</div>
  `
  } else {
    listPlayerWrapper.innerHTML = `
    <div class="player-and-status">
        <div class="name" >${player.owner}</div>
    </div>
    <div class="btn-invite" id="${player.id}">Invite</div>
  `
  }
  document.querySelector('.aside-right .playerList').appendChild(listPlayerWrapper)
  console.log(document.getElementById(player.id));
  
  document.getElementById(player.id).addEventListener('click', () => {
    const inviteMesage = {
      createdAt: new Date().toISOString(),
      message: model.currentUser.displayName + " invited"
    }
   model.invitationsPlayer(inviteMesage, player.id, player.email)
  })
}
view.placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass)
}
view.placeMarkForOpponent = (index, type) => {
  const cellElements = document.querySelectorAll('[data-cell]')
  const dataArr = Array.from(cellElements)
  console.log(index)
  dataArr[index].classList.add(type)
}