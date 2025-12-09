import { baseApi } from "@/app/api";
import type { Company } from "../types/companies.types";

export const companiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<Company[], void>({
      query: () => `/companies`,
      providesTags: (result) =>
        result
          ? [
              ...result.map((c) => ({
                type: "Company" as const,
                id: c.id,
              })),
              { type: "Company" as const, id: "LIST" },
            ]
          : [{ type: "Company" as const, id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCompaniesQuery } = companiesApi;
