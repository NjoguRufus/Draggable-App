// src/utils/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";  // For Realtime Database

// Your Firebase project configuration
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

// Export Firestore and Realtime Database instances
export const firestore = getFirestore(app);  // Firestore
export const database = getDatabase(app);    // Realtime Database
