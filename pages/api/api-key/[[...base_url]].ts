import { eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db";
import { APIKeyTable } from "@/types/schema";
import { type APIDetails } from "@/types/apiKey";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (req.method === "GET") {
        try {
            const apiKeys = await db.select().from(APIKeyTable).all();
            res.status(200).json(apiKeys);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to retrieve API Keys" });
        }
    }
    else if (req.method === "POST") {
        const { base_url, api_key } = req.body as APIDetails;
        if (!base_url || !api_key) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        try {
            const result = await db.insert(APIKeyTable).values({ base_url, api_key }).execute();
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to create API Key" });
        }
    }
    else if (req.method === "DELETE") {
        if (id && typeof id === "string" && parseInt(id) > 0) {
            try {
                await db.delete(APIKeyTable).where(eq(APIKeyTable.id, parseInt(id))).execute();
                res.status(200).json({ message: "API Key deleted" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Failed to delete API Key" });
            }
        } else {
            res.status(400).json({ message: "Invalid API Key ID" });
        }
    }
    res.status(405).json({ message: "Method not allowed" });
}
