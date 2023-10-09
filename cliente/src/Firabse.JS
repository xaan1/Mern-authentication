
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRABSE,
  authDomain: "mern-authentication-96eac.firebaseapp.com",
  projectId: "mern-authentication-96eac",
  storageBucket: "mern-authentication-96eac.appspot.com",
  messagingSenderId: "550421612301",
  appId: "1:550421612301:web:95a0b52f0db6a1d8a55244"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);