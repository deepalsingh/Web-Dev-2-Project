
// Firebase product SDKs 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUVX0kioZkHgmulDmBJiARz5iSt1la2mU",
  authDomain: "freeloop-684df.firebaseapp.com",
  projectId: "freeloop-684df",
  storageBucket: "freeloop-684df.firebasestorage.app",
  messagingSenderId:"210440408281",
  appId: "1:210440408281:web:ed43b65779f41e2e5982c8",
  
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Database integration: db object
export const db = getFirestore(app);