
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDh3LFQnFnabOG3M-tXfGh6DTPmunAiczk",
    authDomain: "inventory-f690e.firebaseapp.com",
    projectId: "inventory-f690e",
    storageBucket: "inventory-f690e.firebasestorage.app",
    messagingSenderId: "866261294991",
    appId: "1:866261294991:web:104ffa954e009b46adb5fa",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = 'en';

const provider = new googleAuthProvider();

const googleAccess = document.getElementsById("Acceso-btn, Inicio-btn");
googleAccess.addEventListener("click", function () {

    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log(user);
            window.location.href = "../index.html";

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
})
