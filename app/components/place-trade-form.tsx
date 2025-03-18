import { useUser } from "@/stores/authStore";
import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "./ui/input";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { placeTrade, placeTradeFormSchema } from "@/services/ezTradeApi";
import { LoadingSpinner } from "./ui/loading-spinner";




export const PlaceTradeForm: React.FC<{ children?: React.ReactNode, account_ids: string[] }> = ({ account_ids }) => {
    const directionRef = useRef(-1);
    const form = useForm<z.infer<typeof placeTradeFormSchema>>({
        resolver: zodResolver(placeTradeFormSchema),
        defaultValues: {
            symbol: "GBPJPY",
            // direction: -1,
            risk_percentage: 1,
            risk_reward: 3,
            timeframe: "M15",
            account_ids
        },
    })


    const user = useUser()!


    async function onSubmit(values: z.infer<typeof placeTradeFormSchema>) {
        try {
            await placeTrade({
                values: {
                    ...values,
                    direction: directionRef.current,
                }, token: await user.getIdToken()
            })
            toast.success("Trade has been submitted")
        } catch (e) {
            console.log(e)
            toast.error("Something wrong, please try again")
        }
    }


    const { isSubmitting } = form.formState

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Symbol</FormLabel>
                        <FormControl>
                            <Input disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="trigger_price"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Trigger Price</FormLabel>
                        <FormControl>
                            <Input disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="risk_percentage"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Risk %</FormLabel>
                        <FormControl>
                            <Input disabled={isSubmitting} {...field} onChange={({ currentTarget }) => {
                                const updatedRiskPercent = Number(currentTarget.value)
                                field.onChange(Number.isNaN(updatedRiskPercent) ? 0 : updatedRiskPercent)
                            }} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="risk_reward"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Risk Reward</FormLabel>
                        <FormControl>
                            <Input disabled={isSubmitting} {...field} onChange={({ currentTarget }) => {
                                const updatedRiskReward = Number(currentTarget.value)
                                field.onChange(Number.isNaN(updatedRiskReward) ? 0 : updatedRiskReward)
                            }} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="timeframe"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Timeframe</FormLabel>
                        <Select disabled={isSubmitting} onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a timeframe" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="M1">M1</SelectItem>
                                <SelectItem value="M5">M5</SelectItem>
                                <SelectItem value="M15">M15</SelectItem>
                                <SelectItem value="H1">H1</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="flex gap-4">
                <Button className="flex-1" onClick={() => { directionRef.current = 1 }} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <LoadingSpinner /> :
                        <>
                            <ArrowUpIcon />
                            Buy
                        </>
                    }
                </Button>
                <Button className="flex-1" onClick={() => { directionRef.current = -1 }} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <LoadingSpinner /> :
                        <>
                            <ArrowDownIcon />
                            Sell
                        </>
                    }
                </Button>
            </div>
        </form>
    </Form>
}

