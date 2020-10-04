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