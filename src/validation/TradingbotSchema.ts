import { z } from "zod";

const tradingbotSchema = z.object({
   symbol: z.string().refine((value) => value !== "", {
      message: "symbol.required",
   }),
   secondarySymbol: z.string(),
    quantity: z
      .number({ message: "quantity.required" })
      .positive({ message: "quantity.positive" }),
   profit_threshold: z
      .number({ message: "profit_threshold.required" })
      .positive({ message: "profit_threshold.positive" })
      .max(100, { message: "profit_threshold.max" }),
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