import { z } from "zod";

const contactSchema = z.object({
   first_name: z.string({ message: "first_name.password" })
      .min(3, { message: "first_name.min" }),
   email: z.string().min(6, { message: "email.required" }).email({ message: "email.invalids" }),
   address:z.string({message:'address.string'}).min(6,{message:"address.min"}),
});

type contactType = z.infer<typeof contactSchema>;

export { contactSchema as contactSchema, type contactType };