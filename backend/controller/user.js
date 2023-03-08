import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

export async function  createUser(email,password,fullname,type,auth,database) {
  try{
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const uid = user.user.uid;
    const userRef = ref(database, 'users/' + uid);
    set(userRef, {
      name: fullname,
      email: email,
      uid: uid,
      type:type
    });
    return user;
  }
  catch(err){
    console.log(err);
    return err;
  }
}

export async function signinUser(email,password,auth){
  try{
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  }
  catch(err){
    console.log(err);
    return err;
  }
}