// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLpZf1CMjiDNVMlcETxwyz7tFQJxRKmI8",
  authDomain: "padbuddy-rice.firebaseapp.com",
  projectId: "padbuddy-rice",
  storageBucket: "padbuddy-rice.firebasestorage.app",
  messagingSenderId: "748964058780",
  appId: "1:748964058780:web:9806d8eb91773c0956ff59",
  measurementId: "G-DTJR3P6VS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);