interface SpendBudgetBarProps {
  spend: number;
  budget: number;
  currency?: string;
}

function SpendBudgetBar({
  spend,
  budget,
  currency = "SEK",
}: SpendBudgetBarProps) {
  const percentage = budget > 0 ? Math.min((spend / budget) * 100, 100) : 0;
  const remaining = Math.max(budget - spend, 0);

  return (
    <div className="w-full mt-4 rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between text-xs">
        <div className="flex flex-col">
          <span className="text-zinc-400">This month&apos;s spend</span>
          <span className="text-sm font-semibold">
            {currency} {spend.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-zinc-400">Budget</span>
          <span className="text-sm font-semibold">
            {currency} {budget.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`
            h-full rounded-full  transition-all duration-300
            ${
              percentage > 80
                ? "bg-gradient-to-r from-red-500 to-orange-400"
                : "bg-[#012d2f]"
            }
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>{Math.round(percentage)}% of budget used</span>
        <span>
          {currency} {remaining.toLocaleString()} remaining
        </span>
      </div>
    </div>
  );
}
export default SpendBudgetBar;
