import React from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { useFetcher } from "react-router";
import { LoadingSpinner } from "./ui/loading-spinner";

interface TradeCardProps {
    trade_account_id: string
    trade_id: string
    account_id: string
    status: string
    entry_price?: number
    stop_loss_price?: number
    take_profit_price?: number
    result?: number
}

export const TradeCard: React.FC<TradeCardProps> = ({ trade_account_id, trade_id, status, entry_price, stop_loss_price, take_profit_price, result, account_id }) => {
    const fetcher = useFetcher();

    return <Card key={trade_account_id} className="flex-1 min-w-[350px]">
        <CardHeader>
            <CardTitle>{trade_account_id}</CardTitle>
            <CardDescription>{status}</CardDescription>
        </CardHeader>
        <CardContent>
            <div>
                Entry: {entry_price}
            </div>
            <div>
                Stop Loss: {stop_loss_price}
            </div>
            <div>
                Take Profit: {take_profit_price}
            </div>
            <div>
                Result: {result}
            </div>
        </CardContent>
        <CardFooter className="flex">
            <Button disabled={fetcher.state === "submitting"} onClick={(e) => {
                e.preventDefault()
                fetcher.submit(
                    { trade_id, account_ids: JSON.stringify([account_id]) },
                    { action: "/manage-trade", method: "post" }
                )
                // cancelTradeMutation({ account_ids: [trade_account_id], trade_id })
            }} className="flex-1" variant="outline">
                {fetcher.state === "submitting" ? <LoadingSpinner /> : "Cancel"}
            </Button>
        </CardFooter>
    </Card>
}