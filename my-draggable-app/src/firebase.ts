import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getDatabase, connectDatabaseEmulator } from "firebase/database"; // Import Realtime Database and Emulator connection
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_74KdeRysXg0K4uXREb-B_eAX8nQ31Gw",
  authDomain: "draggable-app-4522c.firebaseapp.com",
  databaseURL: "https://draggable-app-4522c-default-rtdb.firebaseio.com",
  projectId: "draggable-app-4522c",
  storageBucket: "draggable-app-4522c.firebasestorage.app",
  messagingSenderId: "140232843691",
  appId: "1:140232843691:web:88477a166ffe17289532ee",
  measurementId: "G-32ZLEEXWDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get Firestore instance
export const firestore = getFirestore(app);

// Get Realtime Database instance
export const database = getDatabase(app);

// Connect to Firestore Emulator (only in development mode)
if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(firestore, "localhost", 8080);  // Firestore Emulator
  console.log("Connected to Firestore Emulator");

  connectDatabaseEmulator(database, "localhost", 9000);  // Realtime Database Emulator (default port: 9000)
  console.log("Connected to Realtime Database Emulator");
}
