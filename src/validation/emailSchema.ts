import { z } from "zod";
const forbiddenEmailPattern = /\+\d+@/;

const emailSchema = z.object({
   email: z.string()
      .min(6, { message: "Email is required" })
      .email({ message: "Email is not valid" })
      .refine(value => !forbiddenEmailPattern.test(value), {
         message: "Email with + followed by numbers are not allowed"
      }),
});

type emailType = z.infer<typeof emailSchema>;

export { emailSchema as emailSchema, type emailType as emailType };