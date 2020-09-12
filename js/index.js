window.onload = () => {
  var firebaseConfig = {
    apiKey: "AIzaSyAKCpIpzv5CjEa1rZxjGlhc3EOP4_wyc9o",
    authDomain: "cijs-project.firebaseapp.com",
    databaseURL: "https://cijs-project.firebaseio.com",
    projectId: "cijs-project",
    storageBucket: "cijs-project.appspot.com",
    messagingSenderId: "186739034578",
    appId: "1:186739034578:web:8f3f0c260e5d985e62e00b",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged((user) => {
    console.log(firebase.auth())
    
    if (user) {
      var uid = user.uid
      model.presence();
      model.currentUser = {
        displayName: user.displayName,
        email: user.email,
      };
      if (user.emailVerified) {
        view.setActiveScreen("homePage");
        document.getElementById('log-in').style = 'display: none'

      } else {
        alert("Please verify your email");
        firebase.auth().signOut();
        view.setActiveScreen("loginPage");
      }
    } else {
      model.currentStatus = "offline";
      view.setActiveScreen("homePage");
      document.getElementById('sign-out').style = 'display: none'
    }
  })
  // var userStatusDatabaseRef = firebase.auth().ref('/status/' + uid);

};