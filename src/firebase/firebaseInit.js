import firebase from "firebase/app";

import "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyARaO10K1x6q5bRbDMUjWIqDAiemVIZmwU",
    authDomain: "bloggapp-4dd05.firebaseapp.com",
    projectId: "bloggapp-4dd05",
    storageBucket: "bloggapp-4dd05.appspot.com",
    messagingSenderId: "1036762295674",
    appId: "1:1036762295674:web:5742edfc176a6e5e8dbac3"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  
  export {timestamp};
  export default firebaseApp.firestore();

  