import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { config } from "./config";

const firebaseContext = React.createContext();

// Provider hook that initializes firebase, creates firebase object and handles state
function useProvideFirebase() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (!firebase.apps.length) {
      console.log("I am initializing new firebase app");
      firebase.initializeApp(config);
    }

    const unsubscribeFunction = firebase.auth().onAuthStateChanged((user) => {
      console.log("got new user", user);
      setUser(user);
    });

    return function cleanup() {
      // looks like you don't need to do any clean up, but if you do, do it here
      unsubscribeFunction();
    };
  }, []);

  const register = async (email, password) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const login = async (email, password) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signout = async () => {
    await firebase.auth().signOut();
  };
  
  const changePassword = async (newPassword) => {
    await user.updatePassword(newPassword)
  }

  const resetPassword = async (email) => {
    await firebase.auth().sendPasswordResetEmail(email)
  }

  return {
    user,
    register,
    login,
    signout,
    changePassword,
    resetPassword,
  };
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useFirebase().
export function ProvideFirebase({ children }) {
  const firebaseHook = useProvideFirebase();
  return (
    <firebaseContext.Provider value={firebaseHook}>
      {children}
    </firebaseContext.Provider>
  );
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useFirebase = () => {
  return React.useContext(firebaseContext);
};
