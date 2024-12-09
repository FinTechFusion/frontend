import { z } from "zod";

const tradingbotSchema = z.object({
   secondarySymbol: z.string().optional(),
   symbol: z.string().refine((value) => value !== "", {
      message: "symbol.required",
   }),
   quantity: z
      .number({ message: "quantity.required" })
      .positive({ message: "quantity.positive" }),
   trailing_stop_loss: z
      .number({ message: "trailing_stop_loss.required" })
      .positive({ message: "trailing_stop_loss.positive" })
      .max(100, { message: "trailing_stop_loss.max" }),
   cycles: z
      .number({ message: "cycles.required" })
      .int({ message: "cycles.integer" })
      .positive({ message: "cycles.positive" })
      .max(100, { message: "cycles.max" }),
});


type tradingbotType = z.infer<typeof tradingbotSchema>;

export { tradingbotSchema, type tradingbotType };