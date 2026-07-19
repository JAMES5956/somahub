import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBk_37PKLy7R5xALCEq18JntEDlpNzqGCQ",
  authDomain: "somahub-38bf2.firebaseapp.com",
  projectId: "somahub-38bf2",
  storageBucket: "somahub-38bf2.firebasestorage.app",
  messagingSenderId: "992663219270",
  appId: "1:992663219270:web:1742c28c1523b090512e47",
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);