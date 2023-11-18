import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCK6ke2--UL_wI2-4eWuWmcIVSw4EiAwlE",
    authDomain: "mhacks-aabaa.firebaseapp.com",
    projectId: "mhacks-aabaa",
    storageBucket: "mhacks-aabaa.appspot.com",
    messagingSenderId: "573230679662",
    appId: "1:573230679662:web:0736fdea0d1b19320fc87f",
    measurementId: "G-SB7VMXC3VH"
  };

const cc_app = initializeApp(firebaseConfig);
const db = getFirestore(cc_app);
const auth = getAuth(cc_app);

export { cc_app, db, auth };