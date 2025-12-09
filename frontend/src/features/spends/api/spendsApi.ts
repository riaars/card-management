import { baseApi } from "@/app/api";
import type { SpendSummaryItem } from "../types/spends.types";

export const spendsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpendSummaryByCompany: builder.query<
      SpendSummaryItem[],
      { companyId: string }
    >({
      query: ({ companyId }) => `/companies/${companyId}/spends`,
      providesTags: (result, error, { companyId }) => [
        { type: "Spend", id: `company-${companyId}` },
      ],
    }),

    getSpendSummaryByCard: builder.query<SpendSummaryItem, { cardId: string }>({
      query: ({ cardId }) => `/cards/${cardId}/spends`,
      providesTags: (result, error, { cardId }) => [
        { type: "Spend", id: `card-${cardId}` },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSpendSummaryByCompanyQuery,
  useGetSpendSummaryByCardQuery,
} = spendsApi;
