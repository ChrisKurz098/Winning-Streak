import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    query,
    where,
    getDocs,
    updateDoc,
} from "firebase/firestore";


import { userDataTemplate } from "../userData/userDataFunctions";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: AIzaSyATXqKeF4xvPV19NOJJpoMebdwK34zKVHE,
    authDomain: "winning-streak-64797.firebaseapp.com",
    projectId: "winning-streak-64797",
    storageBucket: "winning-streak-64797.appspot.com",
    messagingSenderId: "70058450446",
    appId: "1:70058450446:web:2afb8a247cc3ad009ea65f",
    measurementId: "G-7F1SVL55CG",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInfo) => {
    if (!userAuth) return;
    const userDocRef = doc(db, "users", userAuth.uid); //database, collection, unique id

    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
        return userDocRef;
    } else {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        const userData = userDataTemplate;

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                userData,
                ...additionalInfo,
            });
        } catch (error) {
            console.log("Error creating user");
            console.log(error);
        }
    }
};


//----Update and read user data----//

export const getRemoteUserData = async (userEmail) => {
    const usersDbRef = collection(db, "users");

    // Create a query against the collection.
    const q = query(usersDbRef, where("email", "==", `${userEmail}`));
    const querySnapshot = await getDocs(q);

    let data;
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
       data = doc.data();
    });
    return data;
};

export const updateRemoteUserData = async (userAuth, updatedData) => {
        await updateDoc(doc(db, "users", userAuth), {
           userData: updatedData
         });

};

//----------------------------//

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callBack) => onAuthStateChanged(auth, callBack);
