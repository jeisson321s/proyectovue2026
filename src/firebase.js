import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCL0hbrA0H-5es3VHwnFoCjLNeiGKUm",
  authDomain: "playexpertvue.firebaseapp.com",
  projectId: "playexpertvue",
  storageBucket: "playexpertvue.firebasestorage.app",
  messagingSenderId: "658159695489",
  appId: "1:658159695489:web:15f11709a62ca031ec7f80"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);