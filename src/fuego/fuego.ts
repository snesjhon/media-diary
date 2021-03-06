import fuego from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

if (!fuego.apps.length) {
  fuego.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
} else {
  fuego.app();
}

const fbDb = fuego.firestore();

// Use this for local testing;
// if (location.hostname === "localhost") {
// fbDb.useEmulator("localhost", 8080);
// }

export const fuegoDb = fbDb;

export default fuego;
