import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "apiKey": "AIzaSyChNOGKm1OMA3iqql-rMFfJh1AMNB6vZVY",
  "authDomain": "kospi200.firebaseapp.com",
  "projectId": "kospi200",
  "storageBucket": "kospi200.firebasestorage.app",
  "messagingSenderId": "134411819686",
  "appId": "1:134411819686:web:5bdac1a3884b614008f267"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
