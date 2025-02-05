import React, { useState } from "react";

export default function CalculateBalance() {
  const [initialUSDT, setinitialUSDT] = useState<Number>(0);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex md:flex-row flex-col gap-5 md:justify-between md:items-center"
    >
      <input
        onChange={(e) => setinitialUSDT(parseFloat(e.target.value))}
        className="main_input md:w-1/3 bg-gray-100 mt-5"
        type="number"
        min={0}
        placeholder="Enter Plance By USDT"
      />
      <button className="main-btn md:w-[200px]" type="submit">
        Calc
      </button>
    </form>
  );
}
