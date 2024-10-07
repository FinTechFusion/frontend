import { z } from "zod";
const forbiddenEmailPattern = /\+\d+@/;

const emailSchema = z.object({
   email: z.string()
      .min(6, { message: "email.required" })
      .email({ message: "email.invalid" })
      .refine(value => !forbiddenEmailPattern.test(value), {
         message: "email.forbidden"
      }),
});

type emailType = z.infer<typeof emailSchema>;

export { emailSchema as emailSchema, type emailType as emailType };