import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  type CardType,
  type Company,
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
      query: ({ companyId }) => `/companies/${companyId}/cards`,
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

    getCardDetails: builder.query<CardType, { cardId: string }>({
      query: ({ cardId }) => `/cards/${cardId}`,
    }),

    getLatestTransactionsByCard: builder.query<
      Transaction[],
      { cardId: string; limit?: number }
    >({
      query: ({ cardId, limit = 5 }) =>
        `/cards/${cardId}/transactions/latest?limit=${limit}`,
    }),

    getTransactionsByCard: builder.query<
      Transaction[],
      { cardId: string; page?: number; pageSize?: number; search?: string }
    >({
      query: ({ cardId, page, pageSize, search }) =>
        `cards/${cardId}/transactions?page=${page}&pageSize=${pageSize}&search=${
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
      query: ({ companyId }) => `/companies/${companyId}/spends`,
    }),

    getSpendSummaryByCard: builder.query<SpendSummaryItem, { cardId: string }>({
      query: ({ cardId }) => `/cards/${cardId}/spends`,
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
  useGetTransactionsByCardQuery,
  useGetLatestTransactionsByCardQuery,
  useGetSpendSummaryByCompanyQuery,
  useGetSpendSummaryByCardQuery,
  useActivateCardMutation,
  useDeactivateCardMutation,
  useGetCardDetailsQuery,
} = cardApi;
