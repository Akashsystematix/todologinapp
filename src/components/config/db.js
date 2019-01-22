import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBXy1_dpgmqLtQHoSmSECQ5BTpJ35sXWPc",
    authDomain: "todologinapp-90a2d.firebaseapp.com",
    databaseURL: "https://todologinapp-90a2d.firebaseio.com",
    projectId: "todologinapp-90a2d",
    storageBucket: "todologinapp-90a2d.appspot.com",
    messagingSenderId: "254737028478"
};
const app = firebase.initializeApp(config);

export const db = app.database();