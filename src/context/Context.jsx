import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase-init";
import { collection, doc, onSnapshot } from "firebase/firestore";

const GState = createContext();

export const Context = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [upadteStatus, setUpdateStatus] = useState(false);
  const [userAuthProvider, setUserAuthProvider] = useState(null);
  const [postesData, setPostesData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [isLoad,setIsLoad] = useState(false);

  useEffect(() => {
    const userAuthLisner = onAuthStateChanged(auth, (user) => {
      setUser(user);
      user?.providerData[0].providerId === "google.com"
        ? setUserAuthProvider("google")
        : setUserAuthProvider("user");
    });

    const unsubscribe = onSnapshot(collection(db, "Products"), (snapshot) => {
      const data = [];
      snapshot.docs.map((doc) => {
        data.push(doc.data());
      });
      setPostesData(data);
    });

    const usersWatcher = onSnapshot(collection(db, "Users"), (snapshot) => {
      const data = [];
      snapshot.docs.map((doc) => {
        data.push(doc.data());
      });
      setUserData(data);
    });



    return () => {
      userAuthLisner();
      unsubscribe();
      usersWatcher();
    };
  }, []);




  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Products"), (snapshot) => {
      const data = [];
      snapshot.docs.map((doc) => {
        data.unshift(doc.data());
      });
      setPostesData(data);
      setIsLoading(false)
    });

    const usersWatcher = onSnapshot(collection(db, "Users"), (snapshot) => {
      const data = [];
      snapshot.docs.map((doc) => {
        data.push(doc.data());
      });
      setUserData(data);
      setIsLoad(true)
    });

    return () => {
      unsubscribe();
      usersWatcher();
    };
  }, [user]);

  return (
    <GState.Provider
      value={{
        user,
        upadteStatus,
        setUpdateStatus,
        userAuthProvider,
        setUserAuthProvider,
        postesData,
        setPostesData,
        userData,
        isLoading,
        isLoad
      }}
    >
      {children}
    </GState.Provider>
  );
};

export const getState = () => {
  return useContext(GState);
};
