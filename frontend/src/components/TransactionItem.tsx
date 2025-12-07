interface TransactionProps {
  id: string;
  amount: number;
  currency: string;
  category: string | null;
  createdAt: string;
  description: string;
}

const TransactionItem = ({
  transaction,
}: {
  transaction: TransactionProps;
}) => {
  return (
    <div className="rounded-3xl px-4 py-3 mb-4">
      <div className="flex items-center">
        <div className="relative mr-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500">
            <span className="text-xl">🧳</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col flex-start items-start">
              <p className="font-medium text-[15px] truncate">
                {transaction.description}
              </p>
              <p className="text-sm text-[15px] truncate"></p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {new Date(transaction.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}{" "}
                {new Date(transaction.createdAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <p className="ml-2 text-[15px] font-semibold whitespace-nowrap">
              {transaction.currency} {transaction.amount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
