import express from 'express'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from './dbconfig.js'
import bodyParser from 'body-parser';
import user from './routes/user.js'

export const app = express()

const PORT = process.env.PORT || 3000;
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const firebaseapp = initializeApp(firebaseConfig);  
export const database = getDatabase(firebaseapp);
export const auth = getAuth(firebaseapp);

app.use('/user',user )

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});

  