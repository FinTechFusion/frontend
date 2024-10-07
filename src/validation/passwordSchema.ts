import { z } from "zod";

const passwordSchema = z.object({
   password: z.string().min(8, { message: "password.min" })
});

type passwordType = z.infer<typeof passwordSchema>;

export { passwordSchema as passwordSchema, type passwordType as passwordType };