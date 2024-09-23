import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { auth, db } from './firebase-config.js'; // Import Firestore and Auth

const googleSignInButton = document.getElementById('googleSignInButton');
const loginErrorMessage = document.getElementById('login-error-message');

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

googleSignInButton.addEventListener('click', async () => {
  try {
    // Sign in with Google Popup
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const uid = user.uid;

    // Check if the user exists in the 'students' collection
    const userDocRef = doc(db, 'students', uid);  // Checking in 'students' collection
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // User is registered, allow login and redirect
      alert('Login successful! Welcome, ' + user.displayName);
      window.location.href = 'main.html'; // Redirect to main page
    } else {
      // User is not registered, stop the process and sign them out
      await auth.signOut();  // Sign out to prevent account creation
      throw new Error('Account does not exist. Please contact support or register first.');
    }
  } catch (error) {
    // Handle errors and display to the user
    loginErrorMessage.textContent = `Error: ${error.message}`;
    loginErrorMessage.style.display = 'block';
  }
});
