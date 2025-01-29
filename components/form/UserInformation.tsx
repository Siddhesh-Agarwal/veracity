"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { toast } from "sonner";
import { Button } from "../ui/button";


const UserInformationSchema = z.object({
    name: z.string().trim().nonempty(),
    email: z.string().trim().email().toLowerCase(),
});

type UserInformation = z.infer<typeof UserInformationSchema>;



export default function UserInformationForm() {
    const form = useForm<UserInformation>({
        resolver: zodResolver(UserInformationSchema),
        defaultValues: {
            name: "User",
            email: "",
        }
    })

    function onSubmit(values: UserInformation) {
        toast.success("Profile updated successfully!");
        console.log(values);
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