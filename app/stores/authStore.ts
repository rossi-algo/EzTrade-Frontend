import { onAuthStateChanged, type User } from 'firebase/auth'
import { create } from 'zustand'

export const useAuthStore = create<{ user: User | null, setUser: (user: User | null) => void }>((set) => ({
    user: null,
    setUser: (user) => set({ user })
}))

export const useUser = () => {
    return useAuthStore(({ user }) => user)
}