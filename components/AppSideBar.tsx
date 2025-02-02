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
import Settings from "./Settings";
import { UserInformation } from "@/types/user";

type SidebarNavLinksType = {
    icon: React.ReactNode;
    text: string;
    hrefLink: string;
}

const SidebarNavLinks: SidebarNavLinksType[] = [
    {
        icon: <Home className="w-4 h-4" />,
        text: "Home",
        hrefLink: "/",
    },
    {
        icon: <Compass className="w-4 h-4" />,
        text: "Discover",
        hrefLink: "/discover",
    },
    {
        icon: <Grid3X3 className="w-4 h-4" />,
        text: "Spaces",
        hrefLink: "/spaces",
    },
    {
        icon: <Library className="w-4 h-4" />,
        text: "Library",
        hrefLink: "/library",
    },
]

export default function AppSideBar() {
    const [information, setInformation] = useState<UserInformation>({ name: "User", email: "" });
    const [initials, setInitials] = useState("");

    const getUserInformation = async () => {
        fetch("/api/user")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setInformation(data)
            });
    }

    useEffect(() => {
        // Get User Information
        getUserInformation()
    }, [])
    useEffect(() => {
        // Get Initials
        setInitials(information.name.split(' ').map((n) => n[0]).join('').toUpperCase());
    }, [information.name]);

    return (
        <Sidebar variant="sidebar" collapsible="icon">
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
                            <Link key={index} href={item.hrefLink} prefetch>
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
                        <div className="p-4 border inline-flex gap-2 rounded-md w-full hover:bg-accent">
                            {/* Avatar */}
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${information.name}`} />
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <p className="text-lg overflow-hidden overflow-ellipsis whitespace-nowrap">
                                {information.name}
                            </p>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="h-1/2 overflow-y-scroll flex flex-col">
                        <DialogHeader>
                            <DialogTitle>
                                Settings
                            </DialogTitle>
                            <DialogDescription>
                                Manage your account settings and preferences.
                            </DialogDescription>
                        </DialogHeader>
                        <Settings information={information} />
                    </DialogContent>
                </Dialog>
            </SidebarFooter>
        </Sidebar>
    )
}
