// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCMa-6qGbEiasBKJVyw7LqZdViipK4EdiE',
  authDomain: 'rocket-6655f.firebaseapp.com',
  projectId: 'rocket-6655f',
  storageBucket: 'rocket-6655f.appspot.com',
  messagingSenderId: '602011541551',
  appId: '1:602011541551:web:6810b95c24b88aa57e66da',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
