import firebase from "firebase/app";

const firebaseConfig = {
  //YOUR FIREBASE CREDENTIALS HERE
};
firebase.firestore();
firebase.storage();
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); //config
}

export default firebase;
