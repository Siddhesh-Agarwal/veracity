import { NextApiRequest, NextApiResponse } from "next";
import { APIKeyTable } from "@/types/schema";
import db from "@/lib/db";
import { APIDetails } from "@/types/apiKey";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const apiKeys = await db.select().from(APIKeyTable).all();
        res.status(200).json(apiKeys);
    }
    else if (req.method === "POST") {
        const { base_url, api_key } = req.body as APIDetails;
        await db.insert(APIKeyTable).values({ base_url, api_key }).execute();
        res.status(200).json({ base_url, api_key });
    }
    else if (req.method === "DELETE") {
        const { key } = req.body;
        await db.delete(APIKeyTable).where(eq(APIKeyTable.id, key)).execute();
        res.status(200).json({ message: "API Key deleted" });
    }
}
