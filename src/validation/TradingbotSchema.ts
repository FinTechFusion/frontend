import { z } from "zod";


const tradingbotSchema = z.object({
   quantity: z
      .number({ message: "Quantity is required" })
      .int({ message: "Quantity must be an integer" })
      .positive({ message: "Quantity must be greater than 0" }),
   profit_threshold: z
      .number({ message: "Profit threshold is required" })
      .positive({ message: "Profit threshold must be greater than 0" })
      .max(100, { message: "Profit threshold must be at most 100" }),
   trailing_stop_loss: z
      .number({ message: "Trailing stop loss is required" })
      .positive({ message: "Trailing stop loss must be greater than 0" })
      .max(100, { message: "Trailing stop loss must be at most 100" }),
   cycles_count: z
      .number({ message: "Max cycles is required" })
      .int({ message: "Max cycles must be an integer" })
      .positive({ message: "Max cycles must be greater than 0" })
      .max(100, { message: "Max cycles must be at most 100" }),
});


type tradingbotType = z.infer<typeof tradingbotSchema>;

export { tradingbotSchema, type tradingbotType };