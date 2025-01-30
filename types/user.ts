import { z } from "zod";

const UserInformationSchema = z.object({
    name: z.string().trim().nonempty(),
    email: z.string().trim().toLowerCase().email().or(z.literal("")),
});

type UserInformation = z.infer<typeof UserInformationSchema>;

export { type UserInformation, UserInformationSchema };
