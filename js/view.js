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
      board.appendChild(sheet);
      document.getElementById('restartButton').addEventListener('click', game.startGame)
      document.getElementById('log-in').style = 'display: none'
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
  if (online) {
    listPlayerWrapper.innerHTML = `
    <div class="name">${player.owner}</div>
    <div type="button" data-toggle="modal" data-target="#myModal" class="btn-invite" id="${player.id}">Invite</div>
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" style="color: black;">Type Of Games</h4>
            <div type="button" class="close" data-dismiss="modal">&times;</div>
          </div>

          <div class="modal-body">
            <div class="dropdown-item opt3x3" data-dismiss="modal">3x3</div>
            <div class="dropdown-item opt5x5" data-dismiss="modal">5x5</div>
            <div class="dropdown-item opt10x10" data-dismiss="modal">10x10</div>
          </div>

          <div class="modal-footer">
            <div type="button" class="btn btn-danger" data-dismiss="modal">Close</div>
          </div>
        </div>
      </div>
    </div>
    `
  } else {
    listPlayerWrapper.innerHTML = `
    <div class="name" >${player.owner}</div>
    <div id="${player.id}">Offline</div>
    `
  }
  document.querySelector('.aside-right .playerList').appendChild(listPlayerWrapper)

  document.getElementById(player.id).addEventListener('click', async () => {
    let inviteMesage = {
      createdAt: new Date().toISOString(),
      message: model.currentUser.displayName + " invited"
    }
    model.invitationsPlayer(inviteMesage, player.id, player.email)


    const typeElement = document.querySelectorAll('.modal .modal-dialog .modal-content .modal-body .dropdown-item')
    await typeElement.forEach(async type => {
      await type.addEventListener('click', handleClick)

    })


    function handleClick(e) {
      const type = e.target;
      inviteMesage.type = type.innerText
      model.invitationsPlayer(inviteMesage, player.id, player.email)
      if (inviteMesage.type === "3x3") {
        game.rule = 3;
        game.size = 3;
        view.setActiveScreen("playPage");
      } else if (inviteMesage.type === "5x5") {
        game.rule = 5;
        game.size = 5;
        view.setActiveScreen("playPage");
      } else if (inviteMesage.type === "10x10") {
        game.rule = 10;
        game.size = 10;
        view.setActiveScreen("playPage");
      }
    }


  })


}

view.addNotification = (message) => {
  let notification = document.createElement('button')
  notification.classList.add('dropdown-item')
  notification.innerText = message
  document.getElementById('listNotification').appendChild(notification)
}