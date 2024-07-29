import { z } from "zod";

const loginSchema = z.object({
   email: z.string().min(6, { message: "Email is required" }).email({ message: "Email is not valid" }),
   password: z.string().min(8, { message: "Password must be at least 8 characters" })
});

type loginType = z.infer<typeof loginSchema>;

export { loginSchema as loginSchema, type loginType as loginType };