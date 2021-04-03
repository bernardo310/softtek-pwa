import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';


const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
});

export default app;

firebase.firestore().enablePersistence();

export const auth = app.auth();
export const db = app.firestore();

/*export const allowNotifications = async () => {
    try {
        const messaging = firebase.messaging();
        //await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log('user token:', token);
        
        return token;
    } catch (error) {
        console.error('smn aquí si entró ahora si');
        console.error(error);
    }
}*/


export const allowNotifications = async () => {
    try {
        const msg = firebase.messaging();

        await Notification.requestPermission().then(async permission => {
            if (permission === "denied") {
                console.log("Permission wasn't granted. Allow a retry.");
                return;
            } else if (permission === "default") {
                console.log("The permission request was dismissed.");
                return;
            }
            const token = await msg.getToken();
            console.log("user token: ", token);

            return token;
        });
    } catch (e) {
        console.error(e);
    }
}