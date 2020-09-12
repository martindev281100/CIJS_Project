const model = {};
model.currentUser = undefined;
model.currentStatus = 'offline';
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
  } catch (err) {
    alert(err.message);
  }
};
model.login = async ({
  email,
  password
}) => {
  try {
    firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    alert(err);
  }
};

model.listenPresence = () => {
  if (firebase.auth().currentUser == null) {
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