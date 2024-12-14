// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwt1kZKTfrXP23T4h1plLS_njZBIRCpeQ",
  authDomain: "netflixgpt-dfc1e.firebaseapp.com",
  projectId: "netflixgpt-dfc1e",
  storageBucket: "netflixgpt-dfc1e.firebasestorage.app",
  messagingSenderId: "482061472515",
  appId: "1:482061472515:web:719ffe6e448de00ca50f36",
  measurementId: "G-P50KZ2WPQL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
