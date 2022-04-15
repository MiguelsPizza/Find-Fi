import React from 'react'
import { getAuth, signOut } from "firebase/auth";


const SignOutComponent = () => {

  const auth = getAuth();
    return (
      auth.currentUser && <button onClick={() => signOut(auth)}>Sign Out</button>
    );
}

export default SignOutComponent