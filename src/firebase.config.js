import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQTdxWqs0hnIFkCc-jNmwto373RVM6CYk",
  authDomain: "house-marketplace-29ed6.firebaseapp.com",
  projectId: "house-marketplace-29ed6",
  storageBucket: "house-marketplace-29ed6.appspot.com",
  messagingSenderId: "922509206478",
  appId: "1:922509206478:web:873f92f1b9b5a210c8419f"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()