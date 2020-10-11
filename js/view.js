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
      document.getElementById("log-in").addEventListener("click", () => {
        view.setActiveScreen("loginPage");
      });
      break;

    case "gamePage":
      document.getElementById("app").innerHTML = component.gamePage;
      await model.listenPresence()
      await model.getPlayer()
      await model.listNotification()
      view.showRankingList()

      document.querySelectorAll(".opt3x3").forEach(type => {
        type.addEventListener('click', function () {
          game.rule = 3;
          game.size = 3;
          view.setActiveScreen("playPage");
        })
      })
      document.querySelectorAll(".opt5x5").forEach(type => {
        type.addEventListener('click', function () {
          game.rule = 4;
          game.size = 5;
          view.setActiveScreen("playPage");
        })
      })
      document.querySelectorAll(".opt10x10").forEach(type => {
        type.addEventListener('click', function () {
          game.rule = 5;
          game.size = 10;
          view.setActiveScreen("playPage");
        })
      })

      const rankingBtn = document.querySelector(".ranking")
      const listPlayerBtn = document.querySelector(".player")
      rankingBtn.addEventListener('click', () => {
        listPlayerBtn.classList.remove('current')
        rankingBtn.classList.add('current')
        view.showRankingList()
      })
      listPlayerBtn.addEventListener('click', () => {
        rankingBtn.classList.remove('current')
        listPlayerBtn.classList.add('current')
        model.listenPlayers()
      })
      document.getElementById("sign-out").addEventListener("click", () => {
        model.setOffline(firebase.auth().currentUser.uid)
        firebase.auth().signOut();
      });
      view.showNotification()
      model.getNotification()
      
      break;

    case "playPage":
      document.getElementById("app").innerHTML = component.playPage;
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
      model.detachListener();
      board.appendChild(sheet);
      document.getElementById('restartButton').addEventListener('click', game.startGame)
      game.startGame()
      model.listenGamesChanges()
      break;
  }
};

view.showPlayerList = (data) => {
  document.querySelector('.rankingList').style = 'display: none'
  const playerList = document.querySelector('.playerList')
  playerList.innerHTML = ""
  playerList.style = 'display: block'
  for (player of model.players) {
    if (player.id === model.currentUser.uid) continue
    let online = false
    for (let i in data) {
      if (data[i].state == "online" && player.id == i) {
        online = true
        break
      }
    }
    view.addPlayer(player, online)
  }
}

view.showRankingList = () => {
  document.querySelector('.playerList').style = 'display: none'
  const rankingList = document.querySelector('.rankingList')
  rankingList.innerHTML = ""
  rankingList.style = 'display: block'
  for (let i = 0; i < model.players.length; i++) {
    const infoWrapper = document.createElement('div')
    infoWrapper.classList.add('info')
    infoWrapper.innerHTML = `
    <div class="rank"> ${i + 1}. </div> 
    <div class="user-name"> ${model.players[i].owner} </div> 
    <div class="score"> ${model.players[i].points} </div>
    `
    rankingList.appendChild(infoWrapper)
  }
}

view.setErrorMessage = (elementId, content) => {
  document.getElementById(elementId).innerText = content;
};

view.addPlayer = (player, online) => {
  const listPlayerWrapper = document.createElement('div')
  listPlayerWrapper.classList.add('info-player')
  listPlayerWrapper.innerHTML = online ? `
  <div class="name">${player.owner}</div>
  <div type="button" data-toggle="modal" data-target="#myModal" class="btn-invite" id="${player.id}">Invite</div>
  ` : `
  <div class="name" >${player.owner}</div>
  <div id="${player.id}">Offline</div>
  `
  document.querySelector('.playerList').appendChild(listPlayerWrapper)

  document.getElementById(player.id).addEventListener('click', () => {
    let inviteMesage = {
      createdAt: new Date().toISOString(),
      message: model.currentUser.displayName + " invited",
    }
    document.querySelectorAll(".opt").forEach(option => {
      option.addEventListener("click", async () => {
        inviteMesage.type = option.innerText
        await model.invitationsPlayer(inviteMesage, player.id, player.email)

      })
    })
  })
}

view.addNotification = (notify) => {
  let notification = document.createElement('div')
  notification.innerHTML = `
  <div class="item">${notify.message}<br>
    <i class="fas fa-check-circle" id="${notify.gameId}" onclick="view.directToGame(${notify.gameId})"></i>
    <i class="fas fa-times-circle"></i>
  </div>
  `
  console.log(notify)
  document.getElementById('listNotification').appendChild(notification)
}

view.showNotification = () => {
  for (let i = 0; i < notify.length; i++) {
    let notification = document.createElement('div')
    notification.innerHTML = `
    <div class="item">${notify[i].message}<br>
      <i class="fas fa-check-circle" id="${notify[i].gameId}" onclick="view.directToGame(${notify[i].gameId}, ${notify.indexOf(notify[i])})"></i>
      <i class="fas fa-times-circle" id="${notify.indexOf(notify[i])}" onclick="view.deleteNotify(${notify.indexOf(notify[i])})"></i>
    </div>
  `
    document.getElementById('listNotification').appendChild(notification)
  }
}


view.directToGame = async (tag, idInvite) => {
  const response = await firebase.firestore().collection('games').doc(tag.id).get()
  model.currentGame = response.data()
  model.currentGame.id = tag.id
  if (response.data().types === "3x3") {
    game.rule = 3;
    game.size = 3;
    view.setActiveScreen("playPage");
  } else if (response.data().types === "5x5") {
    game.rule = 4;
    game.size = 5;
    view.setActiveScreen("playPage");
  } else if (response.data().types === "10x10") {
    game.rule = 5;
    game.size = 10;
    view.setActiveScreen("playPage");
  }
  view.deleteNotify(idInvite)
}

view.deleteNotify = async (id) => {
  const data = await firebase.firestore().collection('users').where('email', '==', model.currentUser.email).get()
  for (oneChange of data.docChanges()) {
    const docData = getOneDocument(oneChange.doc)
    notify.splice(notify.indexOf(id), 1)
    const DataToUpdate = {
      createdAt: docData.createdAt,
      email: docData.email,
      invitations: notify,
      owner: docData.owner,
      points: docData.points,
    }
    firebase.firestore().collection('users').doc(model.currentUser.uid).update(DataToUpdate)
  }
}