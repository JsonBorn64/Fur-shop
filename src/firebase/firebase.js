import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqXMZz24bSw6zIYOyGVe8w6Z7D74fAN9g",
  authDomain: "fur-shop-696b1.firebaseapp.com",
  projectId: "fur-shop-696b1",
  storageBucket: "fur-shop-696b1.appspot.com",
  messagingSenderId: "541922435240",
  appId: "1:541922435240:web:375b21ef7981e023dc629d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }