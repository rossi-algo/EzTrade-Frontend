import { z } from "zod"

export const placeTradeFormSchema = z.object({
    symbol: z.string().min(1),
    // direction: z.union([z.literal(1), z.literal(-1)]),
    risk_percentage: z.number().min(0.1),
    risk_reward: z.number().min(0.1),
    timeframe: z.enum(["M1", "M5", "M15", "H1", "H4"]),
    account_ids: z.string().array(),
    trigger_price: z
        .string()
        .transform((value) => (value === "" ? "" : Number(value)))
        .refine((value) => !isNaN(Number(value)), {
            message: "Expected number, received string",
        })
        .optional()
})

const url = import.meta.env.VITE_EZTRADE_API_URL || "http://localhost:8000"


export const placeTrade = async ({ values, token }: { values: z.infer<typeof placeTradeFormSchema> & { direction: number }, token: string }) => {
    try {
        const response = await fetch(`${url}/trade`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();
        return data
    } catch (error) {
        return error
    }
}

interface TradeAccount {
    trade_id: string,
    trade_account_id: string,
    account_id: string,
    status: "AWAITING_BOT" | "AWAITING_CONDITION" | "EXECUTING_ENTRY_MODEL" | "ORDER_FILLED" | "CANCELLED" | "COMPLETED"
    entry_price?: number
    stop_loss_price?: number
    take_profit_price?: number
    result?: number
}

export interface Account {
    account_id: string
}

export const getTradeAccounts = async (token: string): Promise<TradeAccount[]> => {
    try {
        const response = await fetch(`${url}/trade_accounts`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        return data
    } catch (error) {
        return []
    }
}

export const getAccounts = async (token: string): Promise<Account[]> => {
    try {
        const response = await fetch(`${url}/accounts`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        return data
    } catch (error) {
        return []
    }
}

export const cancelTrade = async ({ token, account_ids, trade_id }: { token: string, account_ids: string[], trade_id: string }): Promise<TradeAccount[]> => {
    try {
        const response = await fetch(`${url}/cancel-trade`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ account_ids, trade_id }),
        });

        const data = await response.json();
        return data
    } catch (error) {
        return []
    }
}