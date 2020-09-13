const model = {};
model.currentUser = undefined;
model.currentStatus = undefined;
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
  console.log(provider)
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
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
  });
}
model.logInWithFacebook = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    if (firebase.auth().currentUser.emailVerified == false) {
      console.log(firebase.auth().currentUser)
      firebase.auth().currentUser.sendEmailVerification();
    }
    console.log(result)
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    console.log(errorCode)
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    alert(errorMessage)
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    // An error happened.
    if (error.code === 'auth/account-exists-with-different-credential') {
      let auth = firebase.auth()
      // Step 2.
      // User's email already exists.
      // The pending Facebook credential.
      var pendingCred = error.credential;
      // The provider account's email address.
      var email = error.email;
      // Get sign-in methods for this email.
      auth.fetchSignInMethodsForEmail(email).then(function (methods) {
        console.log(methods)

        // Step 3.
        // If the user has several sign-in methods,
        // the first method in the list will be the "recommended" method to use.
        if (methods[0] === 'password') {
          // Asks the user their password.
          // In real scenario, you should handle this asynchronously.
          var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
          auth.signInWithEmailAndPassword(email, password).then(function (user) {
            // Step 4a.
            return user.linkWithCredential(pendingCred);
          }).then(function () {
            // Facebook account successfully linked to the existing Firebase user.
            goToApp();
          });
          return;
        }
        // All the other cases are external providers.
        // Construct provider object for that provider.
        // TODO: implement getProviderForProviderId.
        var provider = getProviderForProviderId(methods[0]);
        // At this point, you should let the user know that they already has an account
        // but with a different provider, and let them validate the fact they want to
        // sign in with this provider.
        // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
        // so in real scenario you should ask the user to click on a "continue" button
        // that will trigger the signInWithPopup.
        auth.signInWithPopup(provider).then(function (result) {
          // Remember that the user may have signed in with an account that has a different email
          // address than the first one. This can happen as Firebase doesn't control the provider's
          // sign in flow and the user is free to login using whichever account they own.
          // Step 4b.
          // Link to Facebook credential.
          // As we have access to the pending credential, we can directly call the link method.
          result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function (usercred) {
            // Facebook account successfully linked to the existing Firebase user.
            goToApp();
          });
        });
      });
    }
  });
}