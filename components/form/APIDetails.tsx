import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { APIDetails, APIDetailsSchema } from "@/types/apiKey";


export default function APIDetailsForm() {
    const form = useForm<APIDetails>({
        resolver: zodResolver(APIDetailsSchema),
        defaultValues: {
            base_url: "https://api.example.com",
            api_key: "",
        }
    })
    const [apiDetails, setAPIDetails] = useState<APIDetails[]>([]);

    function onSubmit(values: APIDetails) {
        toast.success("API details updated successfully!");
        setAPIDetails([...apiDetails, values]);
    }

    function removeAPI(index: number) {
        const newAPI = apiDetails.filter((_, i) => i !== index);
        setAPIDetails(newAPI);
        toast.success("API details removed successfully!");
    }

    return (
        <div className="p-4 w-full">
            <p className="text-lg font-semibold">Connections</p>
            <p className="text-sm text-muted-foreground">Manage your API keys and settings.</p>

            <h2 className="text-lg font-semibold mt-4">
                Existing Connections
            </h2>

            <div className="divide-y divide-gray-200 mb-4">
                {
                    (apiDetails.length > 0) ? (
                        apiDetails.map((api, index) => (
                            <div className="inline-flex gap-2" key={index}>
                                <Input
                                    value={api.base_url}
                                    type="url"
                                    disabled
                                />
                                <Input
                                    value={api.api_key}
                                    type="password"
                                    disabled
                                />
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant={"destructive"}>
                                            <Trash2 size={16} />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you sure you want to delete this connection?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete the connection from your account.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction onClick={() => removeAPI(index)}>
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            No connections found.
                        </p>
                    )
                }
            </div>

            <Separator />

            <h2 className="text-lg font-semibold mt-4">
                Add Connection
            </h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="base_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Base URL</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="https://api.example.com" type={"url"} />
                                </FormControl>
                                <FormDescription>
                                    The base URL of the API you want to connect to.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="api_key"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>API Key</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="API key" type={"password"} />
                                </FormControl>
                                <FormDescription>
                                    The API key used to authenticate your requests.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-4">
                        <Button type="submit" variant={"outline"}>Add</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
