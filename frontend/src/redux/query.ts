import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

const query = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API,
});

type TBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  { dataSchema?: any },
  FetchBaseQueryMeta
>;

const baseQuery: TBaseQuery = async (args, api, extraOptions) => {
  const returnValue = await query(args, api, extraOptions);

  const zodSchema = extraOptions?.dataSchema;

  const { data } = returnValue;

  if (data && zodSchema) {
    zodSchema.parse(data);
  }

  return returnValue;
};

export default baseQuery;
