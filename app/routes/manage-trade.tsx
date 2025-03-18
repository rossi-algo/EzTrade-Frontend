import { AppLayout } from "@/components/app-layout";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Route } from "./+types/manage-trade";
import { useAuthStore } from "@/stores/authStore";
import { getAuth, type User } from "firebase/auth";
import { cancelTrade, getTradeAccounts } from "@/services/ezTradeApi";
import { TradeCard } from "@/components/trade-card";
import type { ShouldRevalidateFunctionArgs } from "react-router";

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
}: Route.ClientLoaderArgs) {
    const user = await waitForUser()
    if (!user) return []
    const tradeAccounts = await getTradeAccounts(await user.getIdToken(true))
    return tradeAccounts;
}

export function shouldRevalidate({ actionStatus, defaultShouldRevalidate }: ShouldRevalidateFunctionArgs) {
    // If an action occurred and was successful (status < 300),
    // skip revalidation. Otherwise, use the default behavior.
    // console.log({ actionStatus })
    // if (actionStatus && actionStatus < 300) {
    //     return false;
    // }
    // return defaultShouldRevalidate;

    return false
}

export async function clientAction({ request, params }: Route.ClientActionArgs) {
    const formData = await request.formData()
    const user = await waitForUser()

    const trade_id = formData.get("trade_id")!.toString()
    const account_ids = JSON.parse(formData.get("account_ids")!.toString())


    if (!user) return


    await cancelTrade({ account_ids, trade_id, token: await user.getIdToken(true) })
    return { ok: true }
    // await new Promise((res) => setTimeout(res, 1000));
    // let data = await request.formData();
    // localStorage.setItem("title", data.get("title"));
    // return { ok: true };
}

export default function ManageTradePage({ loaderData }: Route.ComponentProps) {
    return (
        <ProtectedRoute>
            <AppLayout>
                <div className="flex flex-wrap gap-4">
                    {loaderData.map(({ trade_account_id, ...others }) => <TradeCard
                        key={trade_account_id}
                        {...others}
                        trade_account_id={trade_account_id}
                    />
                    )}

                </div>
            </AppLayout>
        </ProtectedRoute>
    )
}

