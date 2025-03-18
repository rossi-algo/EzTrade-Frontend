import { AppLayout } from "@/components/app-layout";
import { PlaceTradeForm } from "@/components/place-trade-form";
import { ProtectedRoute } from "@/components/protected-route";
import { getAuth, type User } from "firebase/auth";
import type { Route } from "../+types/root";
import { getAccounts, getTradeAccounts, type Account } from "@/services/ezTradeApi";



function waitForUser(): Promise<User | null> {
    const auth = getAuth();
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();
            resolve(user);
        });
    });
}


export async function clientLoader({
    params,
}: Route.ClientLoaderArgs): Promise<Account[]> {
    const user = await waitForUser()
    if (!user) return []
    const accounts = await getAccounts(await user.getIdToken(true))
    return accounts;
}

export default function PlaceTradePage({ loaderData }: Route.ComponentProps) {
    const account_ids = (loaderData as unknown as Account[]).map(({ account_id }) => account_id)
    return (
        <ProtectedRoute>
            <AppLayout>
                <PlaceTradeForm account_ids={account_ids}/>
            </AppLayout>
        </ProtectedRoute>
    )
}