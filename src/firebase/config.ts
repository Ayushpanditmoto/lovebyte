// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDCufEIkvZAbJ_cgDbtZFSq5alVjsltak",
  authDomain: "lovebyte-2608f.firebaseapp.com",
  projectId: "lovebyte-2608f",
  storageBucket: "lovebyte-2608f.appspot.com",
  messagingSenderId: "218505858069",
  appId: "1:218505858069:web:f698069a43be4573d8921c",
  measurementId: "G-VC7Y4XBB3J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
