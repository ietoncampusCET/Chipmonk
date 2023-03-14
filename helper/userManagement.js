import { adminAuth } from "../index.js";
import {auth} from "../fire.js";

export function isUserAdmin(user) {
  return user.admin;
}

export async function getUserbyToken(token) {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    console.log(decodedToken);
    const uid = decodedToken.uid;
    const user = await adminAuth.getUser(uid);
    return user;
  } catch (err) {
    console.log(err);
    if (err.code==="auth/argument-error") {
      return {message:"Token Verification failed"};}
  }
}

export async function isAuthenticated(token=null) {
  if(auth.currentUser){
    return true;
 }
 else if (token) {
  const user = await getUserbyToken(token);
  if (user) {
    return true;
  }
  return false;
}

}