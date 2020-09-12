const model = {};
model.currentUser = undefined;
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
model.login = async ({ email, password }) => {
  try {
    firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    alert(err);
  }
};
