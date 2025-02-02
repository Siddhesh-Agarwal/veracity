"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { type UserInformation, UserInformationSchema } from "@/types/user";


export default function UserInformationForm({ info }: { info: UserInformation }) {
    const form = useForm<UserInformation>({
        resolver: zodResolver(UserInformationSchema),
        defaultValues: info,
    })

    async function onSubmit(values: UserInformation) {
        try {
            const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            console.log(response);

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            toast.success("Profile updated successfully!");
            // Reload the page to reflect the changes
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile.");
        }
    }


    return (
        <div className="p-4 w-full">
            <p className="text-lg font-semibold">Personal Information</p>
            <p className="text-sm text-muted-foreground">Update your personal information.</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Jane Doe" />
                                </FormControl>
                                <FormDescription>
                                    This is the name that will be displayed on your profile.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="jane@example.com" />
                                </FormControl>
                                <FormDescription>
                                    We will send important notifications to this email.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-4">
                        <Button type="submit" variant={"outline"}>Save</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
