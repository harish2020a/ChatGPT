import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "chatgpt-2020a.firebaseapp.com",
  projectId: "chatgpt-2020a",
  storageBucket: "chatgpt-2020a.appspot.com",
  messagingSenderId: "393972712646",
  appId: "1:393972712646:web:00fb70ce052c22813483c7",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
