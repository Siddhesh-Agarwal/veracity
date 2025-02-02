import type { NextApiRequest, NextApiResponse } from "next";
import type { UserInformation } from "@/types/user";
import db from "@/lib/db";
import { UserInformationTable } from "@/types/schema";
import { eq } from "drizzle-orm";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const users = await db.select().from(UserInformationTable).all();
        if (users.length === 1) {
            res.status(200).json(users[0]);
        } else {
            res.status(200).json({ name: "User", email: "" });
        }
    } else if (req.method === "POST") {
        const { name, email } = req.body as UserInformation;
        await db.update(UserInformationTable)
            .set({ name, email })
            .where(eq(UserInformationTable.id, 1))
            .execute();
        res.status(200).json({ name, email });
    }
}
