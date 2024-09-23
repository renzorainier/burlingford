import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { auth, db } from './firebase-config.js'; // Import Firestore and Auth

const studentInfoDiv = document.getElementById('studentInfo');
const errorMessage = document.getElementById('error-message');

// Listen for authentication state changes
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log('Current user UID:', user.uid); // Log the current user UID
        const uid = user.uid;
        const userRef = doc(db, 'students', uid);

        try {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const data = userDoc.data();
                console.log('Fetched student data:', data); // Log the fetched data

                // Populate student information
                document.getElementById('studentName').textContent = data.name;
                document.getElementById('studentEmail').textContent = data.email;
                document.getElementById('studentYearLevel').textContent = data.yearLevel;
                document.getElementById('studentCourse').textContent = data.course;
                document.getElementById('studentPhone').textContent = data.phone;
                document.getElementById('studentAddress').textContent = data.address;
                document.getElementById('studentGender').textContent = data.gender;
                document.getElementById('studentEmergencyContactName').textContent = data.emergencyContactName;
                document.getElementById('studentEmergencyContactPhone').textContent = data.emergencyContactPhone;
                document.getElementById('studentParentName').textContent = data.parentName;

                studentInfoDiv.classList.remove('hidden');
            } else {
                errorMessage.textContent = 'No student data found.';
                errorMessage.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error fetching student data:', error);
            errorMessage.textContent = 'Error fetching data.';
            errorMessage.classList.remove('hidden');
        }
    } else {
        errorMessage.textContent = 'User is not logged in.';
        errorMessage.classList.remove('hidden');
        console.log('Current user: null');
        window.location.href = 'index.html'; // Redirect to the login page if not logged in
    }
});
