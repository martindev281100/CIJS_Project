const view = {};

view.setActiveScreen = (screenName) => {
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
      model.listenPresence()
      break;
    //  
    case "gamePage":
      document.getElementById("app").innerHTML = component.gamePage;
      document.getElementById("opt3x3").addEventListener('click', function () {
        view.setActiveScreen("playPage");
      })
      document.getElementById("opt5x5").addEventListener('click', function () {
        view.setActiveScreen("playPage5");
      })
      const btnSignOut = document.getElementById("sign-out");
      btnSignOut.addEventListener("click", () => {
        model.setOffline(firebase.auth().currentUser.uid)
        firebase.auth().signOut();
      });
      model.getPlayer()
      model.listenPresence()
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
      controller.playGame5();
      document.getElementById('log-in').style = 'display: none'
      break;
  }
};

view.setErrorMessage = (elementId, content) => {
  document.getElementById(elementId).innerText = content;
};

//
view.showPlayer = () => {
  for (players of model.players) {
    view.addPlayer(players)
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
  document.querySelector('.aside-right').appendChild(infoWrapper)
}