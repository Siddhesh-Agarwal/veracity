import { z } from "zod"

const URL_SCHEMA = z.string().trim().url()

const APIDetailsSchema = z.object({
    base_url: URL_SCHEMA.startsWith("http://").or(URL_SCHEMA.startsWith("https://")),
    api_key: z.string().trim().min(0),
});

type APIDetails = z.infer<typeof APIDetailsSchema>

export { type APIDetails, APIDetailsSchema }
