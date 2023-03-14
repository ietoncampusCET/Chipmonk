import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./key.js";

const firebaseapp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseapp);
