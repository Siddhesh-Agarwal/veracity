import { z } from 'zod';

const WebSearchSchema = z.object({
    provider: z.enum(['DuckDuckGo', 'Google']).default('DuckDuckGo'),
    apiKey: z.string().trim().optional(),
});

type WebSearch = z.infer<typeof WebSearchSchema>;

export { type WebSearch, WebSearchSchema };
