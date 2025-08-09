// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "me-coffee-dashboard",
  "appId": "1:472782942973:web:ff65ed5e01e898b66cc494",
  "storageBucket": "me-coffee-dashboard.firebasestorage.app",
  "apiKey": "AIzaSyARGezClQ10MvuzPZBVH6AIWdP-pCw6qK4",
  "authDomain": "me-coffee-dashboard.firebaseapp.com",
  "messagingSenderId": "472782942973"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
