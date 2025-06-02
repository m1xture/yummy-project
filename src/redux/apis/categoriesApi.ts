import { Category } from "@/entities/Category.type";
import { baseQueryWithAuth } from "@/features/auth/auth";
import { createApi } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categories",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: (): string => `recipes/category/list`,
    }),
  }),
});

export const useGetAllCategories =
  categoriesApi.endpoints.getAllCategories.useQuery;
