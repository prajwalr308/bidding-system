import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBBkKD7M7boz8b3QmnkTKTgUN1ulZfOk80",
    authDomain: "bidding-system-54d31.firebaseapp.com",
    projectId: "bidding-system-54d31",
    storageBucket: "bidding-system-54d31.appspot.com",
    messagingSenderId: "568667437306",
    appId: "1:568667437306:web:2fa7872055eb35e15b3143"

  };

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();  
const auth=firebase.auth();
const storage=firebase.storage();
const provider= new firebase.auth.GoogleAuthProvider();

export {db,auth,storage,provider};