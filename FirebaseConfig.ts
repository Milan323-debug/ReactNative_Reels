// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8g1BC7zPrvBtUNGbQVqh4jUBWjj6ztpc",
  authDomain: "videoreel-dc723.firebaseapp.com",
  projectId: "videoreel-dc723",
  storageBucket: "videoreel-dc723.firebasestorage.app",
  messagingSenderId: "823880169397",
  appId: "1:823880169397:web:12b1b0e382a79f13d0cbfc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});