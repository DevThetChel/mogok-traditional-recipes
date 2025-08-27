import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCQCUdJPleELpRcIVm9f9zi4A5e1CVZZ8U",
  authDomain: "mogok-recipes.firebaseapp.com",
  databaseURL: "https://mogok-recipes-default-rtdb.firebaseio.com",
  projectId: "mogok-recipes",
  storageBucket: "mogok-recipes.firebasestorage.app",
  messagingSenderId: "740045262164",
  appId: "1:740045262164:web:67756771d5ef08ebaa0cc1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
