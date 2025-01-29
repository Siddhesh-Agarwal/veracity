"use client";

import Image from "next/image";
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Compass, Grid3X3, Home, Library } from "lucide-react";
import VeracityLogo from "@/public/logo.svg";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function CustomAvatar({ name, initials }: { name: string, initials: string }) {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="p-4 border inline-flex gap-2 w-full hover:bg-accent">
                    {/* Avatar */}
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${name}`} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <p className="text-lg overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {name}
                    </p>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Settings
                    </DialogTitle>
                    <DialogDescription>
                        Manage your account settings and preferences.
                    </DialogDescription>
                </DialogHeader>
                <Tabs>
                    <TabsList defaultValue={"information"}>
                        <TabsTrigger value="information">Information</TabsTrigger>
                        <TabsTrigger value="api">API</TabsTrigger>
                    </TabsList>
                    <TabsContent value="information">
                        <div className="p-4">
                            <p className="text-lg font-semibold">Personal Information</p>
                            <p className="text-sm text-muted-foreground">Update your personal information.</p>
                            <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="John Doe" type="text" />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="john@example.com" type="email" />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="api">
                        <div className="p-4">
                            <p className="text-lg font-semibold">API Settings</p>
                            <p className="text-sm text-muted-foreground">Manage your API keys and settings.</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

export default function SideNav() {
    const [name, setName] = useState<string>("User");
    const [email, setEmail] = useState<string>("");
    const [initials, setInitials] = useState("U");
    const SidebarNavLinks = [
        {
            icon: <Home className="w-4 h-4" />,
            text: "Home",
        },
        {
            icon: <Compass className="w-4 h-4" />,
            text: "Discover",
        },
        {
            icon: <Grid3X3 className="w-4 h-4" />,
            text: "Spaces",
        },
        {
            icon: <Library className="w-4 h-4" />,
            text: "Library",
        },
    ]

    useEffect(() => {
        setInitials(name.split(' ').map((n) => n[0]).join('').toUpperCase());
    }, [name]);

    return (
        <Sidebar variant="sidebar" collapsible="offcanvas">
            {/* Logo */}
            <SidebarHeader>
                <Link href="/" prefetch passHref>
                    <div className="p-4 flex items-center gap-2">
                        <Image src={VeracityLogo} alt="Veracity" height={36} />
                        <span className="text-lg font-semibold">Veracity</span>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent>
                {/* New Thread Button */}
                <div className="px-3 py-2">
                    <Button variant="outline" className="w-full justify-between">
                        New Thread
                        <div className="text-xs">
                            <kbd className="border p-0.5 rounded-sm">Ctrl</kbd><kbd className="border p-0.5 rounded-sm">I</kbd>
                        </div>
                    </Button>
                </div>

                {/* Navigation */}
                <SidebarGroup>
                    {
                        SidebarNavLinks.map((item, index) => (
                            <Link key={index} href={"#"}>
                                <div className="w-full gap-3 justify-start text-left inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                                    {item.icon}
                                    {item.text}
                                </div>
                            </Link>
                        ))
                    }
                </SidebarGroup>
            </SidebarContent>

            {/* Try Pro Section */}
            <SidebarFooter>
                <Dialog>
                    <DialogTrigger>
                        <div className="p-4 border inline-flex gap-2 w-full hover:bg-accent">
                            {/* Avatar */}
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${name}`} />
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <p className="text-lg overflow-hidden overflow-ellipsis whitespace-nowrap">
                                {name}
                            </p>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Settings
                            </DialogTitle>
                            <DialogDescription>
                                Manage your account settings and preferences.
                            </DialogDescription>
                        </DialogHeader>
                        <Tabs>
                            <TabsList defaultValue={"information"}>
                                <TabsTrigger value="information">Information</TabsTrigger>
                                <TabsTrigger value="api">API</TabsTrigger>
                            </TabsList>
                            <TabsContent value="information">
                                <div className="p-4">
                                    <p className="text-lg font-semibold">Personal Information</p>
                                    <p className="text-sm text-muted-foreground">Update your personal information.</p>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="John Doe" type="text" value={name} />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" placeholder="john@example.com" type="email" />
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="api">
                                <div className="p-4">
                                    <p className="text-lg font-semibold">API Settings</p>
                                    <p className="text-sm text-muted-foreground">Manage your API keys and settings.</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>
            </SidebarFooter>
        </Sidebar>
    )
}