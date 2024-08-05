import { z } from "zod";

const emailSchema = z.object({
   email: z.string().min(6, { message: "Email is required" }).email({ message: "Email is not valid" }),});

type emailType = z.infer<typeof emailSchema>;

export { emailSchema as emailSchema, type emailType as emailType };