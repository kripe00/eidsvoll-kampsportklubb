import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD227GU_oEXYgiH_NGdp5xN8uy40cVX4do",
  authDomain: "eidsvoll-kampsportklubb.firebaseapp.com",
  projectId: "eidsvoll-kampsportklubb",
  storageBucket: "eidsvoll-kampsportklubb.firebasestorage.app",
  messagingSenderId: "913903063979",
  appId: "1:913903063979:web:7f33fdc2c672f8a6d7f8ee",
  measurementId: "G-15WBHB4C6F"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
