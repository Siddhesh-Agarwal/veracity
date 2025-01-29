import APIDetailsForm from "./form/APIDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import UserInformationForm from "./form/UserInformation";
import AppearanceForm from "./form/Appearance";

export default function Settings() {
    return (
        <Tabs className="w-full">
            <TabsList defaultValue={"user"}>
                <TabsTrigger value="user">User</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>
            <TabsContent value="user">
                <UserInformationForm />
            </TabsContent>
            <TabsContent value="appearance">
                <AppearanceForm />
            </TabsContent>
            <TabsContent value="api">
                <APIDetailsForm />
            </TabsContent>
        </Tabs>
    )
}