import { z } from "zod"

const APIDetailsSchema = z.object({
    base_url: z.string().trim().url(),
    api_key: z.string().trim().min(0),
});

type APIDetails = z.infer<typeof APIDetailsSchema>

export { type APIDetails, APIDetailsSchema }
