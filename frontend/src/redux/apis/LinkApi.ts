import { createApi } from "@reduxjs/toolkit/query/react";
import type { CreateShortenLinkRequest, Link } from "shared-types";
import query from "../query";

export const linkApi = createApi({
  reducerPath: "LinkApi",
  baseQuery: query,
  tagTypes: ["Link"],
  endpoints: (builder) => ({
    fetchAllLinks: builder.query<Link[], void>({
      query: () => `/links/`,
      providesTags: ["Link"],
    }),
    createShortLink: builder.mutation<Link, CreateShortenLinkRequest>({
      query: (link) => ({
        url: `/links/`,
        method: "POST",
        body: link,
      }),
      invalidatesTags: ["Link"],
    }),
  }),
});

export const { useFetchAllLinksQuery, useCreateShortLinkMutation } = linkApi;
