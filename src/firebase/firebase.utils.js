import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyC56bfy69yXGwujiWgbqHOQilwZBjXtwyE',
    authDomain: 'crwn-db-10fa9.firebaseapp.com',
    projectId: 'crwn-db-10fa9',
    storageBucket: 'crwn-db-10fa9.appspot.com',
    messagingSenderId: '882424328773',
    appId: '1:882424328773:web:ba2a089d31a7cbcf1f292c',
    measurementId: 'G-6V8VPNRD6Z',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
