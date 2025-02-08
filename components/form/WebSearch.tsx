"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type WebSearch, WebSearchSchema } from "@/types/webSearch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";


export default function WebSearchForm() {
    const form = useForm<WebSearch>({
        resolver: zodResolver(WebSearchSchema),
    });

    async function onSubmit(value: WebSearch) {
        fetch("/api/web-search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error))
    }

    return (
        <div className="p-4">
            <p className="text-lg font-semibold">Web Search</p>
            <p className="text-sm text-muted-foreground">Search the web.</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="provider"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Search Provider</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={"DuckDuckGo"} disabled>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a search provider" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="DuckDuckGo" defaultChecked>DuckDuckGo</SelectItem>
                                        <SelectItem value="Google">Google</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="apiKey"
                        disabled
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>API Key</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="API Key" />
                                </FormControl>
                                <FormDescription>
                                    This is the API key required to access the selected search engine.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-4">
                        <Button type="submit" variant={"outline"} disabled>
                            Update Search Provider
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
