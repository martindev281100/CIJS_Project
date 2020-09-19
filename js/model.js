const model = {};
model.currentUser = undefined;
model.currentStatus = undefined;
model.players = [];
model.register = async (data) => {
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password);
    firebase.auth().currentUser.updateProfile({
      displayName: data.userName,
    });
    firebase.auth().currentUser.sendEmailVerification();
    console.log(response);
    const dataToAdd = {
      createdAt: new Date().toISOString(),
      points: 1000,
      owner: data.userName,
    }
    console.log(response.user.uid)
    await firebase.firestore().collection('users').doc(response.user.uid).set(dataToAdd)
    firebase.auth().signOut()
  } catch (err) {
    alert(err.message);
  }
};
model.login = async ({
  email,
  password
}) => {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode)
    alert(errorMessage)
    // ...
  });

};

model.listenPresence = () => {
  if (firebase.auth().currentUser == null) {
    model.currentStatus = "offline"
    return;
  } else {
    let uid = firebase.auth().currentUser.uid;
    firebase.database().ref('/status/' + uid).on('value', function (snapshot) {
      model.currentStatus = snapshot.val().state
      console.log(model.currentStatus)
    })
  }

}

model.presence = () => {
  let uid = firebase.auth().currentUser.uid;
  var userStatusDatabaseRef = firebase.database().ref('/status/' + uid);

  var isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };

  var isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };
  var userStatusFirestoreRef = firebase.firestore().doc('/status/' + uid);

  // Firestore uses a different server timestamp value, so we'll 
  // create two more constants for Firestore state.
  var isOfflineForFirestore = {
    state: 'offline',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  };

  var isOnlineForFirestore = {
    state: 'online',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  };

  firebase.database().ref('.info/connected').on('value', function (snapshot) {
    if (snapshot.val() == false) {
      // Instead of simply returning, we'll also set Firestore's state
      // to 'offline'. This ensures that our Firestore cache is aware
      // of the switch to 'offline.'
      userStatusFirestoreRef.set(isOfflineForFirestore);

      return;
    };

    userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
      userStatusDatabaseRef.set(isOnlineForDatabase);
      // We'll also add Firestore set here for when we come online.
      userStatusFirestoreRef.set(isOnlineForFirestore);
    });
  });
}
model.setOffline = (uid) => {
  firebase.database().ref('/status/' + uid).set({
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  })
}
model.logInWithGoogle = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  const response = firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    firebase.firestore().collection("users").doc(result.user.uid).get().then(function (doc) {
      if (doc.exists) {
        return
      } else {
        const dataToAdd = {
          createdAt: new Date().toISOString(),
          points: 1000,
          owner: result.user.displayName,
        }
        firebase.firestore().collection('users').doc(result.user.uid).set(dataToAdd)
      }
    })

    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  })
}
model.logInWithFacebook = async () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  await firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      if (firebase.auth().currentUser.emailVerified == false) {
        console.log(firebase.auth().currentUser)
        await firebase.auth().currentUser.sendEmailVerification();
        firebase.auth().signOut()
      }
      firebase.firestore().collection("users").doc(result.user.uid).get().then(function (doc) {
        if (doc.exists) {
          return
        } else {
          const dataToAdd = {
            createdAt: new Date().toISOString(),
            points: 1000,
            owner: result.user.displayName,
          }
          firebase.firestore().collection('users').doc(result.user.uid).set(dataToAdd)
        }
      })
    })

    // ...
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      console.log(errorCode)
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      alert(errorMessage)
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    });
}
model.getPlayer = async () => {
  const response = await firebase.firestore().collection('users').get()
  model.players = await getManyDocument(response)
  console.log(model.players)
  view.showPlayer()
}