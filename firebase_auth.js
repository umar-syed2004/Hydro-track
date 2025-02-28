// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUjKbwCKIWzCN1towa8B0j4PBMl2vCWaI",
    authDomain: "hydro-track-d3b49.firebaseapp.com",
    projectId: "hydro-track-d3b49",
    storageBucket: "hydro-track-d3b49.firebasestorage.app",
    messagingSenderId: "232322560115",
    appId: "1:232322560115:web:6a1e2d4c74dfbe32ebba06",
    measurementId: "G-1P058XRL5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en'
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-btn");
googleLogin.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log(user);
            window.location.href = "/dashboard.html";

        }) .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
});