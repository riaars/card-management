import React from "react";
import {
  useGetCardsByCompanyQuery,
  useGetCompaniesQuery,
  useGetSpendSummaryByCompanyQuery,
} from "@/service/api/cardApi";
import ContactSupportModal from "@/components/modals/ContactSupportModal";
import SwipeCarousel from "@/layout/SwipeCarousel";

export const DashboardPage: React.FC = () => {
  const [selectedCompany, setSelectedCompany] =
    React.useState("company-seed-0001");

  const [openContactSupport, setOpenContactSupport] = React.useState(false);
  const { data: companies, isLoading: companiesLoading } =
    useGetCompaniesQuery();

  const {
    data: cards = [],
    isLoading: cardsLoading,
    error: cardsError,
  } = useGetCardsByCompanyQuery({ companyId: selectedCompany });

  const {
    data: spendSummary = [],
    isLoading: spendLoading,
    error: spendError,
  } = useGetSpendSummaryByCompanyQuery({ companyId: selectedCompany });

  const loading = companiesLoading || cardsLoading || spendLoading;

  if (loading) {
    return <div className="p-6 text-slate-700">Loading dashboard...</div>;
  }

  if (cardsError || spendError) {
    return (
      <div className="p-6 text-red-600">Failed to load dashboard data.</div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <section>
        <div className="relative w-full lg:w-[450px] flex items-center justify-center mx-auto">
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full  appearance-none
      px-4 py-2.5 pr-10
      text-sm font-medium
      rounded-lg
      bg-white
      border border-slate-200
      text-slate-700
      focus:outline-none
      focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            {companies?.map((company) => (
              <option
                key={company.name}
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
      {/* Cards */}
      <section>
        <SwipeCarousel cards={cards} spends={spendSummary} />
      </section>

      <div className="w-full flex flex-col md:flex-row lg:flex-row justify-center gap-4">
        <button
          className="btn bg-[#012d2f] text-white p-4 rounded-xl full-width font-semibold lg:w-[400px]"
          onClick={() => setOpenContactSupport(true)}
        >
          Contact Qred's Support
        </button>
      </div>
      <ContactSupportModal
        open={openContactSupport}
        onClose={() => setOpenContactSupport(false)}
      />
    </div>
  );
};
