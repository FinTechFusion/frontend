import { z } from "zod";

const contactSchema = z.object({
   first_name: z.string({ message: "Your Name must be a string" })
      .min(3, { message: "name must be at least 3 characters long" }),
   email: z.string().min(6, { message: "Email is required" }).email({ message: "Email is not valid" }),
   address:z.string({message:'Address must be string'}).min(6,{message:"Enter your address"}),
   // message:z.string({message:"Message is required"})
});

type contactType = z.infer<typeof contactSchema>;

export { contactSchema as contactSchema, type contactType };