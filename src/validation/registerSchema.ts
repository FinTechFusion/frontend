import { z } from "zod";

// Regular expression to disallow "+" followed by any digits
const forbiddenEmailPattern = /\+\d+@/;
const namePattern = /^[A-Za-z][A-Za-z0-9\s]*$/;

export const registerSchema = z.object({
   first_name: z.string({ message: "first_name.string" })
      .min(3, { message: "first_name.min" })
      .regex(namePattern, { message: "first_name.alphabetic" }),
   last_name: z.string({ message: "last_name.string" }).min(3, { message: "last_name.min" })
      .regex(namePattern, { message: "last_name.alphabetic" }),
   phone_number: z.string(),
   email: z.string()
      .min(6, { message: "email.required" })
      .email({ message: "email.invalid" })
      .refine(value => !forbiddenEmailPattern.test(value), {
         message: "email.invalid"
      }),
   password: z.string().min(8, { message: "password.min" })
});

// Infer the type from the schema
export type registerType = z.infer<typeof registerSchema>;
