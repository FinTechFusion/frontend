"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../input/input";
import { tradingbotType, tradingbotSchema } from "@/validation/TradingbotSchema";
import { MainBtn } from "../../Buttons/MainBtn";
import { getTokenFromStorage } from '@/context/AuthContext';
import useFetch from '@/hooks/useFetch';
import { API_BASE_URL } from '@/utils/api';

export default function TradingBotForm() {
  const accessToken = getTokenFromStorage("access_token");
  const { register, handleSubmit, formState: { errors } } = useForm<tradingbotType>({
    mode: "onBlur",
    resolver: zodResolver(tradingbotSchema),
  });
  const { data: assetData } = useFetch(`${API_BASE_URL}/users/me/assets`, {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${accessToken}`,
    },
    next: { revalidate: 30 }
  });
  const submitForm: SubmitHandler<tradingbotType> = async (data) => {
    console.log(data)
  };
  return (
    <>
      <h3 className="text-xl font-medium capitalize text-dark w-fit py-2 border-b-2 border-primary-600	">Start Trading</h3>
      <form className="w-full py-3" onSubmit={handleSubmit(submitForm)}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 justify-start items-start ">
          <div>
            <label htmlFor="symbol" className="block capitalize pb-1 text-lg font-medium tracking-wide">
              Symbol
            </label>

            <select
              id="symbol"
              className={`main_input border ${errors.symbol ? 'border-2 border-red-600 shadow' : ''}`}
              {...register('symbol')}
            >
              <option value="">Please select</option>
              {
                assetData?.map((asset: any, index: number) => {
                  return (
                    <>
                      <option key={index} value={asset?.symbol}>{asset?.symbol?.toUpperCase()}</option>
                    </>
                  )
                })
              }

            </select>
            {errors?.symbol?.message && (
              <span className="text-red-600 text-sm pt-2">{errors.symbol.message}</span>
            )}
          </div>

          <Input
            label="Quantity"
            name="quantity"
            type="number"
            placeholder="quantity"
            register={register}
            error={errors.quantity?.message}
          />
          <Input label="Side" value="But" type="text" name="buy" placeholder="" readOnly={true} />
          <Input label="Order Type" value="Spot" type="text" name="spot" placeholder="" readOnly={true} />
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
        <MainBtn content="Start" btnProps="w-fit" />
      </form>
    </>
  )
}
