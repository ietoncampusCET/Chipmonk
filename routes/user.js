import  express, { Router }  from "express";
import { 
        createUser,
        signinUser ,
        updatePassword,
        deleteUser
    } from "../controller/user.js";
import { 
    getUserbyToken,
    isAuthenticated,
 } from "../helper/userManagement.js";


// initialize router
const router = express.Router();

/*
endpoints for user management
--------------------------------
user/signin
user/signup
user/updatePassword
user/deleteUser

admin user management to be added
*/

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

router.post("/deleteUser", async (req, res) => {
    try {
        const { token } = req.body;
        let user = await getUserbyToken(token);
        let msg = await deleteUser(user.uid);
        res.json(msg);
    }catch(err){
        console.log(err);
        res.json({"message": err.message})
    }
});

router.get("/test", async (req, res) => {
    try {

        let user = {message: await isAuthenticated()};
        res.json(user);
    }
    catch(err){
        console.log(err);
        res.json({"message": err.message})
    }
});

export default router;