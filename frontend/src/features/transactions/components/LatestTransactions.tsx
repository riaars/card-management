import { Link } from "react-router-dom";
import TransactionItem from "./TransactionItem";
import type { Transaction } from "../types/transactions.types";

const LatestTransactions = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <section>
      <h2 className="lg:text-xl md:text-lg font-semibold mb-3 mt-3">
        Latest Transactions
      </h2>
      <div className="rounded-xl border border-slate-200 bg-white p-2">
        {transactions.map((trx) => (
          <TransactionItem key={trx.id} transaction={trx} />
        ))}
        <Link to={`/transactions/${transactions[0]?.cardId}`}>
          <button className="btn p-2 rounded-xl w-full font-semibold cursor-pointer">
            See more
          </button>
        </Link>
      </div>
    </section>
  );
};

export default LatestTransactions;
