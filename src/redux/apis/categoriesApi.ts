import { Category } from "@/entities/Category.type";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://so-yumi.p.goit.global/api/",
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: (): string => `recipes/category/list`,
    }),
  }),
});

export const useGetAllCategories =
  categoriesApi.endpoints.getAllCategories.useQuery;
