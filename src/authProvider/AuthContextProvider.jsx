import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "./firebaseConfig";
import { PropTypes } from "prop-types";
import axios from "axios";

const auth = getAuth(app);
// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const SignUpWithEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const LogInWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const addNameAndPhoto = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };
  const logOut = () => {
    return signOut(auth);
  };
  const passwordReset = (email) => {
    sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        axios
          .post("http://localhost:3000/jwt-signIn", {
            email: currentUser?.email,
          })
          .then((res) => localStorage.setItem("jwt-token", res?.data));
      } else {
        localStorage.removeItem("jwt-token");
      }
    });
    return () => {
      return unSubscribe;
    };
  }, [setUser, setLoading]);

  const authInfo = {
    user,
    SignUpWithEmail,
    googleSignIn,
    LogInWithEmail,
    logOut,
    addNameAndPhoto,
    passwordReset,
    loading,
  };
  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
