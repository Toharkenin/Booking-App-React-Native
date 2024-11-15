import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth'; 
import { getFirestore, Firestore } from 'firebase/firestore';

// Define Firebase config object
const firebaseConfig: {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
} = {
  apiKey: "AIzaSyAiluNt-dyX4g9FktDOHnCKFR_T0nh6Gdk",
  authDomain: "booking-app-602ef.firebaseapp.com",
//   databaseURL: "https://booking-app-602ef-default-rtdb.firebaseio.com",
  projectId: "booking-app-602ef",
  storageBucket: "booking-app-602ef.appspot.com",
  messagingSenderId: "303465012338",
  appId: "1:303465012338:web:c1c9f9dd393163231e36eb"
};

// Initialize Firebase app
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth: Auth = getAuth(app);

export { app, auth };

export const db:Firestore = getFirestore(app);
