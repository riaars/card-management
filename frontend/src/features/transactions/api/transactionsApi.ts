import { baseApi } from "@/app/api";
import type { Transaction, Transactions } from "../types/transactions.types";

export interface GetTransactionsByCardArgs {
  cardId: string;
  page?: number;
  pageSize?: number;
  search?: string;
}

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLatestTransactionsByCard: builder.query<
      Transaction[],
      { cardId: string; limit?: number }
    >({
      query: ({ cardId, limit = 5 }) =>
        `/cards/${cardId}/transactions/latest?limit=${limit}`,
      providesTags: (result, _error, { cardId }) =>
        result
          ? [
              ...result.map((tx) => ({
                type: "Transaction" as const,
                id: tx.id,
              })),
              { type: "Transaction" as const, id: `${cardId}-latest` },
            ]
          : [{ type: "Transaction" as const, id: `${cardId}-latest` }],
    }),

    getTransactionsByCard: builder.query<
      Transactions,
      GetTransactionsByCardArgs
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
      providesTags: [{ type: "Transaction" as const, id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLatestTransactionsByCardQuery,
  useGetTransactionsByCardQuery,
} = transactionsApi;
