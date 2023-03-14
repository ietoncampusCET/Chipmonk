import { adminAuth } from "../index.js";

export function isUserAdmin(user) {
  return user.claims.admin;
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



