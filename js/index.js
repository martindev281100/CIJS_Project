window.onload = async () => {
  var firebaseConfig = {
    apiKey: "AIzaSyAKCpIpzv5CjEa1rZxjGlhc3EOP4_wyc9o",
    authDomain: "cijs-project.firebaseapp.com",
    databaseURL: "https://cijs-project.firebaseio.com",
    projectId: "cijs-project",
    storageBucket: "cijs-project.appspot.com",
    messagingSenderId: "186739034578",
    appId: "1:186739034578:web:8f3f0c260e5d985e62e00b",
  };
  firebase.initializeApp(firebaseConfig);
  await firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      model.presence();
      model.currentUser = {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
      };
      if (user.emailVerified) {
        view.setActiveScreen("gamePage");
      } else {
        alert("Please verify your email");
        model.setOffline(user.uid)
        view.setActiveScreen("homePage");
      }
    } else {
      view.setActiveScreen("homePage");
    }
  })
};

const getOneDocument = (response) => {
  const data = response.data()
  data.id = response.id
  return data
}

const getManyDocument = (response) => {
  const listData = [];
  for (const doc of response.docs) {
    listData.push(getOneDocument(doc))
  }
  return listData
}