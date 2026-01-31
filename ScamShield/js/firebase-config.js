// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAITvdZeTsQobC1LOvBHSWv-PSxf4Q_xSg",
  authDomain: "scamshield-ef5c6.firebaseapp.com",
  projectId: "scamshield-ef5c6",
  storageBucket: "scamshield-ef5c6.firebasestorage.app",
  messagingSenderId: "312058714913",
  appId: "1:312058714913:web:c86a88a54361b31236bc60",
  measurementId: "G-0N1Q61MJGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);