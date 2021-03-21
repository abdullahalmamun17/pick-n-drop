import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";


export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            const credential = result.credential;
            const token = credential.accessToken;
            const user = result.user;
            return user;
        })
        .catch((error) => {
            return error;
        });
}

export const handleFacebookSignIn = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();

    return firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .then((result) => {
            const credential = result.credential;
            const user = result.user;
            const accessToken = credential.accessToken;
            return user;
        })
        .catch((error) => {
            return error;
        });
}

export const handleLogout = () => {
    return firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}