import { z } from "zod";

const balanceSchema = z.object({
   balance: z.number({message:'balance.number'}).positive({message:'balance.positive'}).min(1, { message: "balance.required" })

});

type balanceType = z.infer<typeof balanceSchema>;

export { balanceSchema as balanceSchema, type balanceType as balanceType };