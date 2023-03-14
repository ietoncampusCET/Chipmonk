import { getAuth } from "firebase-admin/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../fire.js";
import {adminAuth} from "../index.js";

export async function setAdmin(user) {
  try{
    await adminAuth.setCustomUserClaims(user.uid, {admin: true});
  }catch(err){
    console.log(err);
  }
}

export async function createUser(email,password,fullname) {
  try{
    await auth.signOut();
    let user = await adminAuth.createUser( {
      email:email, 
      password: password, 
      displayName: fullname, 
      disabled: false
    });
    console.log(user);
    await adminAuth.setCustomUserClaims(user.uid, {admin: false});
    console.log(await adminAuth.getUser(user.uid));
    user = await signInWithEmailAndPassword(auth, email, password)
    return user
  }
  catch(err){
    console.log(err);
    return err;
  }
}

export async function signinUser(email,password){
  try{
    await auth.signOut();
    const user = await signInWithEmailAndPassword(auth, email, password)
    return user;
  }
  catch(err){
    console.log(err);
    return err;
  }
}
export async function updatePassword(token) {
  try{
    const decodedToken = await adminAuth.verifyIdToken(token);
    await adminAuth.updateUser(decodedToken.uid, { password: "newPassword" });
    console.log("Password updated");
    return {message:"Password updated"};
  }catch(err){
    console.log(err);
    return {message: err};
  }
}