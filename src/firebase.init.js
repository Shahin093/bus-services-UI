// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDh6mF5rsrtoYiivr0TRw28LgHTcVoYY2M",
    authDomain: "online-bus-counter.firebaseapp.com",
    projectId: "online-bus-counter",
    storageBucket: "online-bus-counter.appspot.com",
    messagingSenderId: "572820304399",
    appId: "1:572820304399:web:277420b8b421664274697a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;