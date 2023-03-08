import  express, { Router }  from "express";
import { createUser,signinUser } from "../controller/user.js";
import { auth,database } from "../index.js";

const router = express.Router();

router.post("/signin", (req, res) => {
  try {
    const { email, password } = req.body;
    user= signinUser(email, password,auth,database);
    res.json(user);
} catch (err) {
        console.log(err);
        res.json({"message": err.message})
  }
});

router.post("/signup", async (req, res) => {
    try {
        const { email, password ,fullname,type} = req.body;
        user = createUser(email, password,fullname,type,auth,database);
        res.json(user);
    }catch(err){
        console.log(err);
        res.json({"message": err.message})
    }
});

        
export default router;