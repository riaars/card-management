import { baseApi } from "@/app/api";
import type { CardDetails, CardType } from "../types/cards.types";

export const cardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

    getCardDetails: builder.query<CardDetails, { cardId: string }>({
      query: ({ cardId }) => `/cards/${cardId}`,
      providesTags: (result, _error, { cardId }) =>
        result ? [{ type: "Card" as const, id: cardId }] : [],
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
  overrideExisting: false,
});

export const {
  useGetCardsByCompanyQuery,
  useGetCardDetailsQuery,
  useActivateCardMutation,
  useDeactivateCardMutation,
} = cardsApi;
