
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "travel-7a182.firebaseapp.com",
  projectId: "travel-7a182",
  storageBucket: "travel-7a182.appspot.com",
  messagingSenderId: "547996031329",
  appId: "1:547996031329:web:dc26d0c63e6b63703d8d20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {app, storage };