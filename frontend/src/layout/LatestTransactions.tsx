import type { Transaction } from "@/service/api/type";
import { Link } from "react-router-dom";
import TransactionItem from "../components/TransactionItem";

interface LatestTransactionsProps {
  latestTrx: Transaction[];
}
const LatestTransactions = ({ latestTrx }: LatestTransactionsProps) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Latest transactions</h2>
      <div className="rounded-xl border border-slate-200 bg-white p-2">
        {latestTrx?.map((trx) => (
          <TransactionItem key={trx.id} transaction={trx} />
        ))}
        <Link to={`/transactions/${latestTrx[0]?.cardId}`}>
          <button className="btn p-2 rounded-xl w-full font-semibold">
            See all
          </button>
        </Link>
      </div>
    </section>
  );
};

export default LatestTransactions;
