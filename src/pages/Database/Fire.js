import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAxf0sJZdH6HnlVW7-pcEhtYGVh6vYEgi4",
  authDomain: "sleep-mask-efb32.firebaseapp.com",
  databaseURL:
    "https://sleep-mask-efb32-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sleep-mask-efb32",
  storageBucket: "sleep-mask-efb32.appspot.com",
  messagingSenderId: "505081321317",
  appId: "1:505081321317:web:774950f6f17c930626738c",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
