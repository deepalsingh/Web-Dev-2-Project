"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GithubAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

// Provider component
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
 
    const gitHubSignIn = () => {
        const provider = new GithubAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const firebaseSignOut = () => {
        return signOut(auth);
    };

    const getIdToken = async () => {
        if (user) {
            try {
                //get user's id token - refresh if needed
                const token = await user.getIdToken(true);
                return token;
            } catch (error) {
                console.error("Error fetching ID token", error);
                return null; 
            }
        }
    }


    // Set up listener for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut, getIdToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useUserAuth = () => {
    return useContext(AuthContext);
};