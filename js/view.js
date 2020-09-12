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
        firebase.auth().signOut();
      });
      break;
  }
};
view.setErrorMessage = (elementId, content) => {
  document.getElementById(elementId).innerText = content;
};
