const model = {};
model.currentUser = undefined;
model.currentStatus = undefined;
model.players = [];

model.register = async (data) => {
  try {
    const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
    firebase.auth().currentUser.updateProfile({
      displayName: data.userName,
    });
    firebase.auth().currentUser.sendEmailVerification();
    const dataToAdd = {
      createdAt: new Date().toISOString(),
      points: 1000,
      owner: data.userName,
    }
    await firebase.firestore().collection('users').doc(response.user.uid).set(dataToAdd)
    firebase.auth().signOut()
  } catch (err) {
    alert(err.message);
  }
};

model.login = async ({email, password}) => {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    alert(error.message)
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
      userStatusFirestoreRef.set(isOfflineForFirestore);
      return;
    };

    userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
      userStatusDatabaseRef.set(isOnlineForDatabase);
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
  }).catch(function (error) {
    alert(error.message)
  })
}

model.logInWithFacebook = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(async function (result) {
    if (firebase.auth().currentUser.emailVerified == false) {
      await firebase.auth().currentUser.sendEmailVerification();
      model.setOffline(result.user.uid)
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
  }).catch(function (error) {
    alert(error.message)
  });
}

//
model.getPlayer = async () => {
  const response = await firebase.firestore().collection('users').get()
  model.players = await getManyDocument(response)
  view.showPlayer()
}