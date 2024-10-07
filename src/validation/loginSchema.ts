import { z } from "zod";

const loginSchema = z.object({
   email: z.string().min(6, { message: "email.required" }).email({ message: "email.invalid" }),
   password: z.string().min(8, { message: "password.min" })
});

type loginType = z.infer<typeof loginSchema>;

export { loginSchema as loginSchema, type loginType as loginType };