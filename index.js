import express from 'express'
import { cert } from 'firebase-admin/app';
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import {getFirestore} from "firebase-admin/firestore";
import { firebaseAdminConfig } from './key.js'
import bodyParser from 'body-parser';
import user from './routes/user.js'

export const app = express()

const PORT = process.env.PORT || 3000;
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const firebaseapp = initializeApp({credential:cert(firebaseAdminConfig),
});  
export const database = getFirestore(firebaseapp);
export const adminAuth = getAuth(firebaseapp);
app.use('/user',user )

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});

  