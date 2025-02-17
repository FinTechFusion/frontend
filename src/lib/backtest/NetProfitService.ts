interface ProfitTradesProps {
  Profit: number; // Profit percentage for each trade
}

 function CalculateNetProfitAndRIO(initialUSDT: number, trades: ProfitTradesProps[]) {
  let balance: number = initialUSDT; // Start with initial capital

  trades.forEach((trade:ProfitTradesProps) => {
    let profitPercent = trade?.Profit; // Ensure it's a valid number
    if (!isNaN(profitPercent)) {
      balance += (balance * profitPercent) / 100; // Apply profit percentage
    }
  });
  let netProfit = balance - initialUSDT; // Total profit earned
  let roi = (netProfit / initialUSDT) * 100; // ROI percentage
  return {
    finalBalance: balance.toFixed(2),
    netProfit: netProfit.toFixed(2),
    roi: roi.toFixed(2) + "%",
  };
}

export {CalculateNetProfitAndRIO}