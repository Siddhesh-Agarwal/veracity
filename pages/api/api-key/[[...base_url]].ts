import { eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db";
import { APIKeyTable } from "@/types/schema";
import { type APIDetails } from "@/types/apiKey";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (req.method === "GET") {
        const apiKeys = await db.select().from(APIKeyTable).all();
        res.status(200).json(apiKeys);
    }
    else if (req.method === "POST") {
        const { base_url, api_key } = req.body as APIDetails;
        if (!base_url || !api_key) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const result = await db.insert(APIKeyTable).values({ base_url, api_key }).execute();
        res.status(200).json(result);
    }
    else if (req.method === "DELETE") {
        if (id && typeof id === "string" && parseInt(id) > 0) {
            await db.delete(APIKeyTable).where(eq(APIKeyTable.id, parseInt(id))).execute();
            res.status(200).json({ message: "API Key deleted" });
        } else {
            res.status(400).json({ message: "Invalid API Key ID" });
        }
    }
}
