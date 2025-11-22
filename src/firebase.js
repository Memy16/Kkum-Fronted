// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDWf8W2HtScdS1iNf_dZ_4wiz6c4ze942g",
    authDomain: "kkum-26d3f.firebaseapp.com",
    projectId: "kkum-26d3f",
    storageBucket: "kkum-26d3f.firebasestorage.app",
    messagingSenderId: "1042616416940",
    appId: "1:1042616416940:web:6b56a2902207a24b90fd09"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, provider);
