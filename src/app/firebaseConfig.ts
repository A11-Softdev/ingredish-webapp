import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPTPHAG7YBTJSj34rrfXVv-RhPKvw6CRc",
  authDomain: "ingredish-4505f.firebaseapp.com",
  projectId: "ingredish-4505f",
  storageBucket: "ingredish-4505f.appspot.com",
  messagingSenderId: "682380228635",
  appId: "1:682380228635:web:bf50f0f84adb904c0820be",
  measurementId: "G-HXEHNBTE30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, auth };