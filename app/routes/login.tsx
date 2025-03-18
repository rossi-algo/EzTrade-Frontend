import { LoginForm } from "@/components/login-form";
import { useAuthStore } from "@/stores/authStore";
import { auth } from "firebase";
import { signInWithEmailAndPassword } from "firebase/auth"
import { redirect } from "react-router";


export default function LoginPage() {
    const { setUser, user } = useAuthStore()


    // if (user) {
    //     <Navigate to="/" replace />
    // }

    // console.log('user', user)
    return <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
            <LoginForm onLogin={async (email, password) => {
                const user = await signInWithEmailAndPassword(auth, email, password)
                console.log('user', user)
                if (user) {
                    setUser(user.user)
                    redirect("/")
                }
            }} />
        </div>
    </div>
}
