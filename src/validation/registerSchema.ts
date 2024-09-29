import { z } from "zod";

// Regular expression to disallow "+" followed by any digits
const forbiddenEmailPattern = /\+\d+@/;

const registerSchema = z.object({
   first_name: z.string({ message: "First Name must be a string" })
      .min(3, { message: "First name must be at least 3 characters long" }),
   last_name: z.string().min(3, { message: "Last name must be at least 3 characters long" }),
   phone_number: z.string(),
   email: z.string()
      .min(6, { message: "Email is required" })
      .email({ message: "Email is not valid" })
      .refine(value => !forbiddenEmailPattern.test(value), {
         message: "Email with + followed by numbers are not allowed"
      }),
   password: z.string().min(8, { message: "Password must be at least 8 characters" })
});

type registerType = z.infer<typeof registerSchema>;

export { registerSchema, type registerType };
