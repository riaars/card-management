import React from "react";
import {
  useGetCardsByCompanyQuery,
  useGetCompaniesQuery,
  useGetSpendSummaryByCompanyQuery,
} from "@/service/api/cardApi";
import SwipeCarousel from "@/layout/SwipeCarousel";
import { skipToken } from "@reduxjs/toolkit/query";

export const DashboardPage: React.FC = () => {
  const { data: companies, isLoading: companiesLoading } =
    useGetCompaniesQuery();
  const [selectedCompany, setSelectedCompany] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    if (!companies || companies.length === 0) return;
    if (!selectedCompany) {
      setSelectedCompany(companies[0].id);
    }
  }, [companies, selectedCompany]);

  const {
    data: cards = [],
    isLoading: cardsLoading,
    error: cardsError,
  } = useGetCardsByCompanyQuery(
    selectedCompany ? { companyId: selectedCompany } : skipToken
  );

  // const {
  //   data: spendSummary = [],
  //   isLoading: spendLoading,
  //   error: spendError,
  // } = useGetSpendSummaryByCompanyQuery(
  //   selectedCompany ? { companyId: selectedCompany } : skipToken
  // );

  const loading = companiesLoading;

  if (loading) {
    return (
      <div className="p-6 w-full lg:w-[450px] flex items-center justify-center mx-auto text-slate-700">
        Loading dashboard...
      </div>
    );
  }

  if (cardsError) {
    return (
      <div className="p-6  w-full lg:w-[450px] flex items-center justify-center mx-auto text-red-600">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <section>
        <div className="relative w-full lg:w-[450px] flex items-center justify-center mx-auto">
          <select
            value={selectedCompany ?? ""}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full  appearance-none
      px-4 py-2.5 pr-10
      text-sm font-medium
      rounded-lg
      bg-white
      border border-slate-200
      text-slate-700
      focus:outline-none
      focus:ring-2 focus:ring-[#012d2f]-500 focus:border-[#012d2f]-500"
          >
            {companies?.map((company) => (
              <option
                key={company.id}
                value={company.id}
                className="w-full lg:w-[450px]"
              >
                {company.name}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="w-4 h-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 9l6 6 6-6"
              />
            </svg>
          </div>
        </div>
      </section>
      <section>{companies && cards && <SwipeCarousel cards={cards} />}</section>
    </div>
  );
};
