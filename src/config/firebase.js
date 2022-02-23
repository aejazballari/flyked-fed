/* eslint-disable linebreak-style */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/firestore';
import 'firebase/compat/storage';
// import Axios from 'axios';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCOQjQ6HtUUPWwRhm0WcT5LETECxQQ2vRM',
  authDomain: 'flyked-dev-adhoc.firebaseapp.com',
  projectId: 'flyked-dev-adhoc',
  storageBucket: 'flyked-dev-adhoc.appspot.com',
  messagingSenderId: '1087025587806',
  appId: '1:1087025587806:web:c426732988d026c9d8b6cf',
});

// const db = firebaseApp.firestore();

const auth = firebase.auth();

const storage = firebaseApp.storage();

const signInWithGoogle = async () => {
  let userDetails;
  try {
    const res = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const { user } = res;
    userDetails = user?.multiFactor?.user;

    return { status: 'success', data: userDetails };
  } catch (err) {
    return { status: 'error', message: err.message };
  }
};

// const signInWithFacebook = async () => {
//   try {
//     await auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
//   } catch (err) {
//     console.log(err);
//   }
// };

const logout = async () => {
  await auth.signOut();
};

export {
  auth, storage, signInWithGoogle, logout,
};
// export default db;
