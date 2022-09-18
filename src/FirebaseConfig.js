// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const startFireBase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDNquFIZ9vu-l7zrPMUmjrpvkyFKvdH92U",
    authDomain: "tic-tac-toe-50e97.firebaseapp.com",
    databaseURL:
      "https://tic-tac-toe-50e97-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tic-tac-toe-50e97",
    storageBucket: "tic-tac-toe-50e97.appspot.com",
    messagingSenderId: "1056337902289",
    appId: "1:1056337902289:web:c714aa821909b5ed0ae3f0",
    measurementId: "G-FDR2WD68B1",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
};
export default startFireBase;
