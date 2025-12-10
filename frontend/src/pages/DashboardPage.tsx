import React from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import SwipeCarousel from "@/features/cards/ui/SwipeCarousel";
import { useGetCompaniesQuery } from "@/features/companies/api/companiesApi";
import { useGetCardsByCompanyQuery } from "@/features/cards/api/cardsApi";
import CompanyList from "@/features/companies/components/CompanyList";
import { AsyncBlock } from "@/shared/components/AsyncBlock";

export const DashboardPage = () => {
  const {
    data: companies,
    isLoading: companiesLoading,
    error: companiesError,
  } = useGetCompaniesQuery();
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

  return (
    <div className="p-6 space-y-6">
      <AsyncBlock
        loading={companiesLoading}
        error={!!companiesError}
        loadingText="Loading companies..."
        errorText="Failed to load dashboard..."
      >
        <CompanyList
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          companies={companies}
        />
      </AsyncBlock>

      <AsyncBlock
        loading={cardsLoading}
        error={!!cardsError}
        loadingText="Loading cards..."
        errorText="Failed to load cards..."
      >
        <SwipeCarousel cards={cards} />
      </AsyncBlock>
    </div>
  );
};
