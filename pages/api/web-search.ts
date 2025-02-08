import type { NextApiRequest, NextApiResponse } from "next";
import type { WebSearch } from "@/types/webSearch";
import db from "@/lib/db";
import { WebSearchTable } from "@/types/schema";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const searchProviders = await db.select().from(WebSearchTable).all()
            return res.status(200).json({ provider: searchProviders[0].provider, apiKey: searchProviders[0].apiKey });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to retrieve search providers" });
        }
    } else if (req.method === "POST") {
        // update the search provider in the database
        const { provider, apiKey } = req.body as WebSearch;
        try {
            await db.update(WebSearchTable)
                .set({ provider, apiKey })
                .where(eq(WebSearchTable.id, 1))
                .execute();
            return res.status(200).json({ message: "Search provider updated successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to update search provider" });
        }
    }
    res.status(405).json({ message: "Method not allowed" });
}
