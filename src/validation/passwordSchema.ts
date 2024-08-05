import { z } from "zod";

const passwordSchema = z.object({
   password: z.string().min(8, { message: "Password must be at least 8 characters" })
});

type passwordType = z.infer<typeof passwordSchema>;

export { passwordSchema as passwordSchema, type passwordType as passwordType };