import { useState } from "react";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";

import TransactionItem from "@/features/transactions/components/TransactionItem";
import { useGetTransactionsByCardQuery } from "@/features/transactions/api/transactionsApi";
import type { Transaction } from "@/features/transactions/types/transactions.types";

import { useGetCardDetailsQuery } from "@/features/cards/api/cardsApi";
import BackButton from "@/shared/components/BackButton";
import Pagination from "@/shared/components/Pagination";
import SearchInput from "@/shared/components/SearchIput";
import { TOTAL_ITEMS_PER_PAGE } from "@/shared/utils/constant";

const TransactionsPage = () => {
  const { cardId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const trxQueryArgs = cardId
    ? {
        cardId,
        page: currentPage,
        pageSize: TOTAL_ITEMS_PER_PAGE,
        search: query,
      }
    : skipToken;

  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useGetTransactionsByCardQuery(trxQueryArgs);

  const cardDetailsArg = cardId ? { cardId } : skipToken;

  const {
    data: cardDetails,
    isLoading: cardDetailsLoading,
    error: cardDetailsError,
  } = useGetCardDetailsQuery(cardDetailsArg);

  const companyOwner = cardDetails?.company || "";
  const cardMaskedNumber = cardDetails?.maskedNumber || "";

  const transactions = transactionsData?.transactions || [];
  const totalCount = transactionsData?.totalCount || 0;
  const start = (currentPage - 1) * TOTAL_ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * TOTAL_ITEMS_PER_PAGE, totalCount);

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
    if (
      transactionsError &&
      "status" in transactionsError &&
      transactionsError.status === 429
    ) {
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
          <div className="text-gray-500 text-left">No transactions found.</div>
        )}
      </div>

      {totalCount > TOTAL_ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalItemsPerPage={TOTAL_ITEMS_PER_PAGE}
          totalItems={totalCount}
          handleChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default TransactionsPage;
