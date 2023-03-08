// Import the functions from the SDKs 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain:import.meta.env.VITE_AUTH_DOMAIN,
  projectId:import.meta.env.VITE_PROJECT_ID ,
  storageBucket:import.meta.env.VITE_STORAGE_BUCKET ,
  messagingSenderId:import.meta.env.VITE_MESSAGEING_SENDER ,
  appId:import.meta.env.VITE_APP_ID ,
  measurementId:import.meta.env.VITE_MEASUREMENT
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


// Initialize Storage
export const storage = getStorage();



// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);