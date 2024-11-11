import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJquyWBeh2vtLb_68j6ueiUBvtTNDoDoM",
    authDomain: "subscriptions-42e39.firebaseapp.com",
    projectId: "subscriptions-42e39",
    storageBucket: "subscriptions-42e39.firebasestorage.app",
    messagingSenderId: "511991535074",
    appId: "1:511991535074:web:26f88cdbe8c773f95e55bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = firebase.initializeApp(firebaseConfig);
export default db.firestore();
