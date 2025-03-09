// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (Replace with your Firebase settings)
const firebaseConfig = {
  apiKey: "AIzaSyCbdk_ec2h2w5j0mAXaJHijdvISdzUKUlk",
  authDomain: "mobile-app-1840d.firebaseapp.com",
  databaseURL: "https://mobile-app-1840d-default-rtdb.firebaseio.com",
  projectId: "mobile-app-1840d",
  storageBucket: "mobile-app-1840d.firebasestorage.app",
  messagingSenderId: "585901648555",
  appId: "1:585901648555:web:a6c25f6196f6787fd5e5ee",
  measurementId: "G-TVSZY7V3Y0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db , getDownloadURL , ref , getStorage };
