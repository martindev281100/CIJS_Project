const model = {};

model.currentUser = undefined;
model.currentStatus = undefined;
model.players = [];
model.currentGame = undefined;

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
      ations: [],
      email: data.email,
    }
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
  firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
    alert(error.message)
  });
};

model.listenPresence = async () => {
  if (firebase.auth().currentUser == null) {
    model.currentStatus = "offline"
    return;
  } else {
    let uid = firebase.auth().currentUser.uid;
    await firebase.database().ref('/status/' + uid).on('value', function (snapshot) {
      model.currentStatus = snapshot.val().state
    })
  }
}

model.presence = async () => {
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

  await firebase.database().ref('.info/connected').on('value', function (snapshot) {
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
          invitations: [],
          email: result.user.email,
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
          invitations: [],
          email: result.user.email,
        }
        firebase.firestore().collection('users').doc(result.user.uid).set(dataToAdd)
      }
    })
  }).catch(function (error) {
    alert(error.message)
  });
}

model.getPlayer = async () => {
  const response = await firebase.firestore().collection('users').get()
  model.players = getManyDocument(response)
  model.players.sort(condition)
}

model.addPosition = async (data) => {
  dataToUpdate = {
    tempo: firebase.firestore.FieldValue.arrayUnion(data),
  }
  await firebase.firestore().collection('games').doc(model.currentGame.id).update(dataToUpdate)
}

model.listenPlayers = async () => {
  await firebase.database().ref().on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      view.showPlayerList(childData)
    });
  });
  return false;
}

model.invitationsPlayer = async (data, playerId, playerEmail) => {
  newGame = {
    createdAt: new Date().toISOString(),
    players: [model.currentUser.email, playerEmail],
    types: data.type,
    tempo: [],
  }
  const response = await firebase.firestore().collection('games').add(newGame)
  data.gameId = response.id
  dataToUpdate = {
    invitations: firebase.firestore.FieldValue.arrayUnion(data),
  }
  await firebase.firestore().collection('users').doc(playerId).update(dataToUpdate)
  model.getNewGame();
}

model.listenGamesChanges = () => {
  firebase.firestore().collection('games').where('players', 'array-contains', model.currentUser.email).onSnapshot((snapshot) => {
    for (oneChange of snapshot.docChanges()) {
      const docData = getOneDocument(oneChange.doc)
      if (oneChange.type === 'modified') {
        game.cellElements[docData.tempo[docData.tempo.length - 1].position].classList.add(docData.tempo[docData.tempo.length - 1].type)
        game.circleTurn = !game.circleTurn;
        if (model.currentUser.email != docData.tempo[docData.tempo.length - 1].owner) {
          game.cellElements.forEach(cell => {
            cell.addEventListener('click', game.handleClick, {once: true})
          })
        }
        game.setBoardHoverClass()
      }
    }
  })
}

model.getNotification = () => {
  firebase.firestore().collection('users').where('email', '==', model.currentUser.email).onSnapshot((snapshot) => {
    for (oneChange of snapshot.docChanges()) {
      const docData = getOneDocument(oneChange.doc)
      if (oneChange.type === 'modified') {
        view.addNotification(docData.invitations[docData.invitations.length - 1])
      }
    }
  })
}

model.getNewGame = async () => {
  const response = await firebase.firestore().collection('games').where('players', 'array-contains', model.currentUser.email).get()
  const docData = await getManyDocument(response)
  let newestGame = docData[0];
  for (let i = 1; i < docData.length; i++) {
    if (docData[i].createdAt > newestGame.createdAt) {
      newestGame = docData[i]
    }
  }
  model.currentGame = newestGame
}

model.getGame = async () => {
  const response = await firebase.firestore().collection('games').doc(model.currentGame.id).get()
  const tempo = getOneDocument(response).tempo
  if (tempo.length) {
    game.updateGameBoard(tempo[0].position)
    game.circleTurn = !game.circleTurn;
  }
}

