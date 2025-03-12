import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import {getDatabase, ref, push, onValue, remove, get} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';
import { getFirestore, setDoc, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyCC80Q-fA-SPOpG1InuL0YeN0XWSnCIHeE",
  authDomain: "login-app-c54d8.firebaseapp.com",
  projectId: "login-app-c54d8",
  storageBucket: "login-app-c54d8.firebasestorage.app",
  messagingSenderId: "581894156919",
  appId: "1:581894156919:web:f7ad66c6a603e7e8e04c72",
  measurementId: "G-ZF4E03RV9P"
};

const app = initializeApp(firebaseConfig); // Initialize Firebase
const database = getDatabase(app); // Initialize realtime database
const auth = getAuth(app);  // Initialize authentication app
const db = getFirestore(app);  // Initialize Firestore database

export function createAccount(name, email, password){
  createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    const user = userCredential.user;

    // adding the values to firestore database
    const docRef = doc(db, 'users', user.uid);
    const userData = {
      email: user.email,
      name: name
    }
    await setDoc(docRef, userData);
  })
  .catch((error) => {
    console.log(error);
    // const errorCode = error.code;
  })
}

export async function loginWIthEmailAndPassword(email, password){
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const userId = userCredential.user.uid;
  return userId;
}

export async function getEmployeeData(uid){
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}