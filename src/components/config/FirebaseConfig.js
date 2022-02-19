// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore';
import { FacebookAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import store from "../../store";
import { setUser } from "../../store/reducers/loggedUser";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp7sOcfgPWvGa4EOscJT1SUl_WWDLW0WM",
  authDomain: "peridot-2b1d5.firebaseapp.com",
  projectId: "peridot-2b1d5",
  storageBucket: "peridot-2b1d5.appspot.com",
  messagingSenderId: "945464055589",
  appId: "1:945464055589:web:55811736c8b60c0fdc6ccc",
  measurementId: "G-JY8EPL5HCW"
};

class FirebaseConfig {
  init() {
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    /* eslint-disable no-unused-vars */
    this.analytics = getAnalytics(this.app);
    // listen to auth change
    onAuthStateChanged(this.getAuth(), (user) => {
      console.log("onAuthStateChanged", user);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        store.dispatch(setUser(user));
      } else {
        store.dispatch(setUser(null));
      }
    });
  }

  getAuth() {
    return getAuth(this.app);
  }

  signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    // provider.addScope('user_birthday');
    provider.setCustomParameters({
      'display': 'popup'
    });
    return signInWithPopup(this.getAuth(), provider)
      .then(() => {
        // browserHistory
      })
      .catch((err) => {
        console.error("Failed to sign in with facebook.", err);
      });
  }

  signOut() {
    return signOut(this.getAuth())
  }
}

export default new FirebaseConfig();