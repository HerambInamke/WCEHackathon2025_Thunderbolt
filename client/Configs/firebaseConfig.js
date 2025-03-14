import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZTv8jApIgWern9QYL6az3YZ5IPCwbCeQ",
  authDomain: "careercompass-acc8c.firebaseapp.com",
  projectId: "careercompass-acc8c",
  storageBucket: "careercompass-acc8c.firebasestorage.app",
  messagingSenderId: "129955835145",
  appId: "1:129955835145:web:ea37a1fe66e275c97a77d8",
  measurementId: "G-ZEFN2VS5JP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider, signInWithPopup };
