import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBLpZf1CMjiDNVMlcETxwyz7tFQJxRKmI8",
  authDomain: "padbuddy-rice.firebaseapp.com",
  projectId: "padbuddy-rice",
  storageBucket: "padbuddy-rice.firebasestorage.app",
  messagingSenderId: "748964058780",
  appId: "1:748964058780:web:9806d8eb91773c0956ff59",
  measurementId: "G-DTJR3P6VS6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch {
    // analytics unsupported in this environment
  }
}

export { app, auth, analytics };