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
      document
        .getElementById("redirect-to-login")
        .addEventListener("click", function () {
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
      document
        .getElementById("redirect-to-register")
        .addEventListener("click", function () {
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
    case "gamePage":
      document.getElementById("app").innerHTML = component.gamePage;
      document.getElementById("opt3x3").addEventListener('click', function () {
        view.setActiveScreen("playPage");
      })
      const btnSignOut = document.getElementById("sign-out");
      btnSignOut.addEventListener("click", () => {
        model.setOffline(firebase.auth().currentUser.uid)
        firebase.auth().signOut();
      });
      model.listenPresence()
      break;
    case "playPage":
      document.getElementById("app").innerHTML = component.playPage;
      controller.playGame()
  }
};
view.setErrorMessage = (elementId, content) => {
  document.getElementById(elementId).innerText = content;
};