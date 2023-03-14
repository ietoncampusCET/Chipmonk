import  express, { Router }  from "express";
import { getAuth } from "firebase-admin/auth";
import { createUser,signinUser } from "../controller/user.js";
import { database } from "../index.js";

const router = express.Router();

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user= await signinUser(email, password);
    res.json(user);
} catch (err) {
        console.log(err);
        res.json({"message": err.message})
  }
});

router.post("/signup", async (req, res) => {
    try {
        const { email, password ,fullname} = req.body;
        let user = await createUser(email, password,fullname);
        res.json(user);
    }catch(err){
        console.log(err);
        res.json({"message": err.message})
    }
});

        
export default router;