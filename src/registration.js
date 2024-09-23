import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { auth, db } from './firebase-config.js'; // Import Firestore and Auth

const googleSignInButton = document.getElementById('googleSignInButton');
const errorMessage = document.getElementById('error-message');
const studentForm = document.getElementById('studentForm');
const registerButton = document.getElementById('registerButton');
const additionalInfoForm = document.getElementById('additionalInfoForm');

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

googleSignInButton.addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const uid = user.uid;

    document.getElementById('email').value = user.email;
    document.getElementById('name').value = user.displayName;

    const userRef = doc(db, 'students', uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      studentForm.style.display = 'block';

      additionalInfoForm.addEventListener('input', () => {
        const isFormComplete = [...document.querySelectorAll('#additionalInfoForm input, #additionalInfoForm select')]
          .every(input => input.value);

        registerButton.disabled = !isFormComplete;
      });

      additionalInfoForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;
        const yearLevel = document.getElementById('yearLevel').value; // Changed from 'grade' to 'yearLevel'
        const course = document.getElementById('course').value; // New field for course
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const gender = document.getElementById('gender').value;
        const emergencyContactName = document.getElementById('emergencyContactName').value;
        const emergencyContactPhone = document.getElementById('emergencyContactPhone').value;
        const parentName = document.getElementById('parentName').value;

        await setDoc(userRef, {
          name: name,
          email: email,
          age: age,
          yearLevel: yearLevel, // Save yearLevel instead of grade
          course: course, // Save course selected
          phone: phone,
          address: address,
          gender: gender,
          emergencyContactName: emergencyContactName,
          emergencyContactPhone: emergencyContactPhone,
          parentName: parentName,
        });

        alert('Registration complete! Welcome, ' + name);
        window.location.href = 'main.html'; // Redirect to main page
      });
    } else {
      alert('You are already registered! Welcome back, ' + user.displayName);
      window.location.href = 'main.html'; // Redirect to main page
    }
  } catch (error) {
    errorMessage.textContent = 'Error: ' + error.message;
    errorMessage.style.display = 'block';
  }
});
