import APIDetailsForm from "./form/APIDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import UserInformationForm from "./form/UserInformation";
import AppearanceForm from "./form/Appearance";
import WebSearch from "./form/WebSearch";
import { UserInformation } from "@/types/user";

export default function Settings({ information }: { information: UserInformation }) {
    return (
        <Tabs className="w-full">
            <TabsList defaultValue={"user"}>
                <TabsTrigger value="user">User</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
                <TabsTrigger value="web-search">Web Search</TabsTrigger>
            </TabsList>
            <TabsContent value="user">
                <UserInformationForm info={information} />
            </TabsContent>
            <TabsContent value="appearance">
                <AppearanceForm />
            </TabsContent>
            <TabsContent value="api">
                <APIDetailsForm />
            </TabsContent>
            <TabsContent value="web-search">
                <WebSearch />
            </TabsContent>
        </Tabs>
    )
}
