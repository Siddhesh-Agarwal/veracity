import type { NextApiRequest, NextApiResponse } from "next";
import type { UserInformation } from "@/types/user";
import db from "@/lib/db";
import { UserInformationTable } from "@/types/schema";
import { eq } from "drizzle-orm";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const users = await db.select().from(UserInformationTable).all();
            res.status(200).json({ name: users[0].name, email: users[0].email });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    } else if (req.method === "POST") {
        const { name, email } = req.body as UserInformation;
        try {
            await db.update(UserInformationTable)
                .set({ name, email })
                .where(eq(UserInformationTable.id, 1))
                .execute();
            res.status(200).json({ message: "User details updated successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    res.status(405).json({ message: "Method not allowed" });
}
