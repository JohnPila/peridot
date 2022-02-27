// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import store from "../store";
import { setUser } from "../store/reducers/loggedUser";
import RoleService from "../services/RoleService";
import { collection, doc, getFirestore } from "firebase/firestore";
import { ROLES, ROLE_IDS, STORAGE_FOLDERS } from "../utils/constants";
import UserService from "../services/UserService";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const CONFIG = {
  apiKey: "AIzaSyAp7sOcfgPWvGa4EOscJT1SUl_WWDLW0WM",
  authDomain: "peridot-2b1d5.firebaseapp.com",
  projectId: "peridot-2b1d5",
  storageBucket: "peridot-2b1d5.appspot.com",
  messagingSenderId: "945464055589",
  appId: "1:945464055589:web:55811736c8b60c0fdc6ccc",
  measurementId: "G-JY8EPL5HCW"
};

export const COLLECTIONS = {
  ROLES: "Roles",
  USER_ROLES: "UserRoles",
  USERS: "Users",
  PACKAGES: "Packages",
};

class FirebaseConfig {
  init() {
    this._checkLoggedState = true;
    // Initialize Firebase
    this._app = initializeApp(CONFIG);
    /* eslint-disable no-unused-vars */
    this._analytics = getAnalytics(this._app);
    this._db = getFirestore(this._app);
    this._storage = getStorage(this._app);
    // listen to auth change
    onAuthStateChanged(this.auth, async (user) => {
      console.log("onAuthStateChanged", user);
      if (!this._checkLoggedState) {
        return false;
      }
      this._checkLoggedState = false;
      if (user) {
        const role = await RoleService.getRoleByUserId(user.uid);
        user.role = role.name;
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        store.dispatch(setUser(user));
      } else {
        store.dispatch(setUser(null));
      }
    });
  }

  get app() {
    return this._app;
  }

  get db() {
    return this._db;
  }

  get auth() {
    return getAuth(this._app);
  }

  getCollectionRef(name) {
    return collection(this._db, name);
  }

  getDocRef(name, id) {
    return doc(this._db, name, id);
  }

  getStorageRef(name, path = STORAGE_FOLDERS.GLOBALS) {
    return ref(this._storage, `${path}/${name}`);
  }

  async registerWithEmail({firstName, lastName, email, password}) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async ({user}) => {
        const displayName = `${firstName} ${lastName}`;
        await UserService.updateUser({displayName});
        await RoleService.createUserRole(ROLE_IDS.USER, user.uid);
        user.role = ROLES.USER;
        user.displayName = displayName;
        this.sendEmailVerification();
        store.dispatch(setUser(user));
      })
      .catch((err) => {
        console.error("Failed to register with email.", err);
        throw err;
      });
  }

  async signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    // provider.addScope('user_birthday');
    provider.setCustomParameters({
      'display': 'popup'
    });
    return signInWithPopup(this.auth, provider)
      .then(async ({user}) => {
        const role = await RoleService.getRoleByUserId(user.uid);
        user.role = role.name;
        store.dispatch(setUser(user));
      })
      .catch((err) => {
        console.error("Failed to sign in with facebook.", err);
        throw err;
      });
  }

  async signInWithEmail(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(async ({user}) => {
        const role = await RoleService.getRoleByUserId(user.uid);
        user.role = role.name;
        store.dispatch(setUser(user));
      })
      .catch((err) => {
        console.error("Failed to sign in with email.", err);
        throw err;
      });
  }

  async signOut() {
    return signOut(this.auth)
      .then(() => {
        store.dispatch(setUser(null));
      })
      .catch((err) => {
        console.error("Failed to sign out.", err);
        throw err;
      });
  }

  async sendEmailVerification() {
    return sendEmailVerification(this.auth.currentUser)
      .catch((err) => {
        console.error("Failed to send email verification.", err);
        throw err;
      });
  }

  async sendPasswordResetEmail(email) {
    return sendPasswordResetEmail(this.auth, email)
      .catch((err) => {
        console.error("Failed to send password reset to email.", err);
        throw err;
      });
  }
}

export default new FirebaseConfig();