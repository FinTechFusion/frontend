import { z } from "zod";

const registerSchema = z.object({
   first_name: z.string({ message: "First Name must be a string" })
      .min(3, { message: "First name must be at least 3 characters long" }),
   last_name: z.string().min(3, { message: "Last name must be at least 3 characters long" }),
   phone: z.string(),
   email: z.string().min(6, { message: "Email is required" }).email({ message: "Email is not valid" }),
   password: z.string().min(8, { message: "Password must be at least 6 characters" })
});

type registerType = z.infer<typeof registerSchema>;

export { registerSchema, type registerType };