import { initializeApp } from "firebase/app";
import { Auth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { firebaseConfig } from "../../firebase-config";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

class FirebaseAuth {
    private static instance: FirebaseAuth;
    private static auth: Auth;
    private constructor() {

        const app = initializeApp(firebaseConfig);
        FirebaseAuth.auth = initializeAuth(app, {
            persistence: getReactNativePersistence(ReactNativeAsyncStorage),
        })
    }
    public static getAuthInstance(): Auth {
        if (!FirebaseAuth.auth) {
            const app = initializeApp(firebaseConfig);
            FirebaseAuth.auth = initializeAuth(app, {
                persistence: getReactNativePersistence(ReactNativeAsyncStorage),
            })
        }
        return FirebaseAuth.auth;
    }
}

export default FirebaseAuth;