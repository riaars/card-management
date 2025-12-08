import BackButton from "@/components/BackButton";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchIput";
import TransactionItem from "@/components/TransactionItem";
import {
  useGetCardDetailsQuery,
  useGetTransactionsByCardQuery,
} from "@/service/api/cardApi";
import type { Transaction } from "@/service/api/type";
import { useState } from "react";
import { useParams } from "react-router-dom";

const TransactionsPage = () => {
  const { cardId } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const totalItemsPerPage = 10;

  const {
    data,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useGetTransactionsByCardQuery({
    cardId,
    page: currentPage,
    pageSize: totalItemsPerPage,
    search: query,
  });

  const {
    data: cardDetails,
    isLoading: cardDetailsLoading,
    error: cardDetailsError,
  } = useGetCardDetailsQuery({ cardId });

  const companyOwner = cardDetails?.company || "";
  const cardMaskedNumber = cardDetails?.maskedNumber || "";

  const transactions = data?.transactions || [];
  const totalCount = data?.totalCount || 0;
  const start = (currentPage - 1) * totalItemsPerPage + 1;
  const end = Math.min(currentPage * totalItemsPerPage, totalCount);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleSearch = (val: string) => {
    setQuery(val);
    setCurrentPage(1);
  };

  const loading = cardDetailsLoading || transactionsLoading;
  const error = cardDetailsError || transactionsError;

  if (loading) {
    return (
      <div className="p-6  w-full lg:w-[450px] flex-col justify-center items-center mx-auto text-slate-700">
        Loading transactions...
      </div>
    );
  }

  if (error) {
    if (transactionsError?.status === 429) {
      return (
        <div className="p-6  lg:w-[450px] flex-col justify-center items-center mx-auto text-amber-700">
          You’re sending too many requests. Please wait a bit, refresh and try
          again.
        </div>
      );
    } else
      return (
        <div className="p-6 text-red-600">Failed to load transactions.</div>
      );
  }

  const getTransactionSummaryCount = () => {
    if (totalCount === 0) {
      return "Showing 0 transactions";
    }

    return `Showing ${start} - ${end} of ${totalCount} transactions`;
  };

  return (
    <div className="p-6 lg:w-[450px] flex-col justify-center items-center mx-auto">
      <BackButton />
      <p className="font-semibold text-xl mb-4">
        {companyOwner} | {cardMaskedNumber}
      </p>
      <p className="font-semibold text-md mb-4"></p>
      <SearchInput
        value={query}
        placeholder="Search transactions..."
        onChange={handleSearch}
        debounce={500}
      />
      <div className="space-y-4">
        <p className="text-sm text-gray-600 mt-2 text-end">
          {getTransactionSummaryCount()}
        </p>
        {transactions?.map((transaction: Transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}

        {!transactionsLoading && transactions.length === 0 && (
          <div className="text-gray-500">No transactions found.</div>
        )}
      </div>

      {totalCount > totalItemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalItemsPerPage={totalItemsPerPage}
          totalItems={totalCount}
          handleChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default TransactionsPage;
