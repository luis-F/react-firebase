import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'


const firebaseConfig = {
  apiKey: "SECRET",
  authDomain: "SECRET",
  databaseURL: "SECRET",
  projectId: "SECRET",
  storageBucket: "SECRET",
  messagingSenderId: "SECRET",
  appId: "SECRET",
  measurementId: "SECRET"
};

class Firebase {
  constructor(){
    firebase.initializeApp(firebaseConfig)
    this.auth = firebase.auth();
    this.db = firebase.firestore()
  }
  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }
  logout() {
    return this.auth.signOut()
  }
  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password)
    return this.auth.currentUser.updateProfile({
      displayName: name
    })
  }
  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }
  getCurrentUsername(){
    return this.auth.currentUser.displayName
  }
}

export default new Firebase();
