import { useAuthStore } from "@/stores/authStore";
import { auth } from "firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [checkingUser, setCheckingUser] = useState(true)
    const { user, setUser } = useAuthStore()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setCheckingUser(false)
        });
        return () => unsubscribe();
    }, [setUser]);

    if (checkingUser) {
        return null
    }
    if (!user) {
        return <Navigate to={"/login"} replace/>
    }

    return children
}