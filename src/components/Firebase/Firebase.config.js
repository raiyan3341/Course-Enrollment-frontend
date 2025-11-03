import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDe7oZagf64baDCC6XiT5bIn6mLoc-gBT4",
  authDomain: "course-enrollment-d0cb4.firebaseapp.com",
  projectId: "course-enrollment-d0cb4",
  storageBucket: "course-enrollment-d0cb4.firebasestorage.app",
  messagingSenderId: "209204508587",
  appId: "1:209204508587:web:2245821ed5687b53c984ee"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);