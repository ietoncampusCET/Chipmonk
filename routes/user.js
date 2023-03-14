import  express, { Router }  from "express";
import { createUser,signinUser ,updatePassword} from "../controller/user.js";
import { getUserbyToken } from "../helper/userManagement.js";

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

router.post("/updatePassword", async (req, res) => {
    try {
        const { token } = req.body;
        let user = await updatePassword(token);
        res.json(user);
    }catch(err){
        console.log(err);
        res.json({"message": err.message})
    }
});

router.get("/test", async (req, res) => {
    try {
        let user = {message:"test"};
        res.json(user);
    }
    catch(err){
        console.log(err);
        res.json({"message": err.message})
    }
});

        
export default router;