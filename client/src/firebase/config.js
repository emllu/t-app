// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASEAPI_KEY,
  authDomain: "blog-app-3eec7.firebaseapp.com",
  projectId: "blog-app-3eec7",
  storageBucket: "blog-app-3eec7.appspot.com",
  messagingSenderId: "743902125227",
  appId: "1:743902125227:web:6d9be17d928548fbe26bee"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);