import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase';
import firebase from 'firebase/app';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function loginWithGoogle() {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        return auth.signInWithPopup(googleProvider)
    }

    function logout() {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        loginWithGoogle,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
