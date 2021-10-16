import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBp6sbiOc-OkbaQLvx5L8HOHPL7Q9rATNU",
  authDomain: "covitrack-b1f78.firebaseapp.com",
  projectId: "covitrack-b1f78",
  storageBucket: "covitrack-b1f78.appspot.com",
  messagingSenderId: "186583766250",
  appId: "1:186583766250:web:c48b9774e43808601ef393",
};
firebase.firestore();
firebase.storage();
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); //config
}

export default firebase;
