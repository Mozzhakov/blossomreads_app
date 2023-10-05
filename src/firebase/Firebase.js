import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxKkncf1szIOvD9u77W-8Nc7Tq7Kxw-Zs",
  authDomain: "stastiem.firebaseapp.com",
  projectId: "stastiem",
  storageBucket: "stastiem.appspot.com",
  messagingSenderId: "98845389409",
  appId: "1:98845389409:web:819523ffd4ad1c20823020",
  measurementId: "G-K1NJD1THHV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
