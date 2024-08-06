"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../input/input";
import { tradingbotType, tradingbotSchema } from "@/validation/TradingbotSchema";
import { MainBtn } from "../../Buttons/MainBtn";

export default function TradningBotForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<tradingbotType>({
    mode: "onBlur",
    resolver: zodResolver(tradingbotSchema),
  });
  const submitForm: SubmitHandler<tradingbotType> = async (data) => {
    console.log(data)
  };
  return (
    <>
      <h3 className="text-xl font-medium capitalize text-dark w-fit py-2 border-b-2 border-primary-600	">Start Trading</h3>
      <form className="md:w-4/5 w-full py-3" onSubmit={handleSubmit(submitForm)}>
        <div className="grid grid-cols-1 ">
          <Input
            label="Quantity"
            name="quantity"
            type="number"
            placeholder="quantity"
            register={register}
            error={errors.quantity?.message}
          />
          <label>Side</label>
          <input type="text" readonly value="Buy" className="auth_input border-2 my-2"/>
          <label>Order Type</label>
          <input type="text" readonly value="Spot" className="auth_input border-2 my-2"/>
          <Input
            label="Profit threshold"
            name="profit_threshold"
            type="number"
            placeholder="Enter Profit threshold"
            register={register}
            error={errors.profit_threshold?.message}
          />
          <Input
            label="Trailing Stop Loss"
            name="trailing_stop_loss"
            type="number"
            placeholder="Enter Trailing Stop Loss"
            register={register}
            error={errors.trailing_stop_loss?.message}
          />
          <Input
            label="Max Cycles"
            name="cycles_count"
            type="number"
            placeholder="Max Cycles"
            register={register}
            error={errors.cycles_count?.message}
          />
        </div>
        <MainBtn content="Start" btnWidth="w-fit" />
      </form>
    </>
  )
}
