import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  type CardType,
  type Company,
  type Invoice,
  type SpendSummaryItem,
  type Transaction,
} from "./type";

export const cardApi = createApi({
  reducerPath: "cardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000/v1/api",
  }),
  endpoints: (builder) => ({
    getCompanies: builder.query<Company[], void>({
      query: () => `/companies`,
    }),

    getCardsByCompany: builder.query<CardType[], { companyId: string }>({
      query: ({ companyId }) => `/company/${companyId}/cards`,
      providesTags: (result) => {
        const listTag = [{ type: "Card" as const, id: "LIST" }];
        if (!result) return listTag;
        return [
          ...listTag,
          ...result.map(({ id }) => ({
            type: "Card" as const,
            id,
          })),
        ];
      },
    }),

    getInvoicesByCompany: builder.query<Invoice[], { companyId: string }>({
      query: ({ companyId }) => `/invoices?companyId=${companyId}`,
    }),

    getLatestTransactionsByCompany: builder.query<
      Transaction[],
      { companyId: string; limit?: number }
    >({
      query: ({ companyId, limit = 5 }) =>
        `/transactions/latest?companyId=${companyId}&limit=${limit}`,
    }),

    getLatestTransactionsByCard: builder.query<
      Transaction[],
      { cardId: string; limit?: number }
    >({
      query: ({ cardId, limit = 5 }) =>
        `/transactions/latestbycard?cardId=${cardId}&limit=${limit}`,
    }),

    getTransactionsByCompany: builder.query<
      Transaction[],
      { companyId: string; page?: number; pageSize?: number }
    >({
      query: ({ companyId }) => `/transactions?companyId=${companyId}`,
    }),

    getTransactionsByCard: builder.query<
      Transaction[],
      { cardId: string; page?: number; pageSize?: number; search?: string }
    >({
      query: ({ cardId, page, pageSize, search }) =>
        `/transactions?cardId=${cardId}&page=${page}&pageSize=${pageSize}&search=${
          search || ""
        }`,
      transformErrorResponse: (response) => {
        if (response.status === 429) {
          return { ...response, isRateLimited: true };
        }
        return response;
      },
    }),

    getSpendSummaryByCompany: builder.query<
      SpendSummaryItem[],
      { companyId: string }
    >({
      query: ({ companyId }) => `/spend-summary?companyId=${companyId}`,
    }),

    activateCard: builder.mutation<CardType, { cardId: string }>({
      query: ({ cardId }) => ({
        url: `/cards/${cardId}/activate`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Card", id: "LIST" }],
    }),

    deactivateCard: builder.mutation<CardType, { cardId: string }>({
      query: ({ cardId }) => ({
        url: `/cards/${cardId}/deactivate`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Card", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useGetCardsByCompanyQuery,
  useGetInvoicesByCompanyQuery,
  useGetTransactionsByCompanyQuery,
  useGetTransactionsByCardQuery,
  useGetLatestTransactionsByCompanyQuery,
  useGetLatestTransactionsByCardQuery,
  useGetSpendSummaryByCompanyQuery,
  useActivateCardMutation,
  useDeactivateCardMutation,
} = cardApi;
