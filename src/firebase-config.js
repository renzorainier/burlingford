import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration (replace with your own Firebase project credentials)
const firebaseConfig = {
  apiKey: "AIzaSyCKQFDn6C1RUNqwZo-2mDO6rlpRX3TJyzc",
  authDomain: "mobcom-760a2.firebaseapp.com",
  projectId: "mobcom-760a2",
  storageBucket: "mobcom-760a2.appspot.com",
  messagingSenderId: "320723251437",
  appId: "1:320723251437:web:4783a8beb59a18c20ddce4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };