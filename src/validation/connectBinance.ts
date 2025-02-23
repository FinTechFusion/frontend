import { z } from "zod";

const connectBinance = z.object({
    api_key: z.string().min(5, { message: "api_key.required" }),
    api_secret: z.string().min(5, { message: "api_secret.required" }),
});

type connectBinanceType = z.infer<typeof connectBinance>;

export {
  connectBinance as connectBinance,
  type connectBinanceType as connectBinanceType,
};
