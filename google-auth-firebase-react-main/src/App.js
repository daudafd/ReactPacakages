import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import GoogleButton from "react-google-button";
import { AuthContext } from "./context/auth";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./config/firebase";
import Home from "./components/Home";

const App = () => {
  const { user } = useContext(AuthContext);
  const [value,setValue] = useState('')
  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((data)=>{
      setValue(data.user.email)
      localStorage.setItem("email",data.user.email)
  });
  };

  useEffect(()=>{
    setValue(localStorage.getItem('email'))
})

  const handleLogOut = () => {
    signOut(auth);
  };

  return (
    <div>
      <nav>
        {user ? <Home/> : (
          <GoogleButton onClick={handleSignIn} />
        )}
      </nav>
    </div>
  );
};

export default App;
