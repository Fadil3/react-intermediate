import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PetAPIResponse, Animal, BreedListAPIResponse } from "./types";

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-apis.com" }),
  endpoints: (builder) => ({
    getPet: builder.query({
      query: (id: string) => ({
        url: "pets",
        params: {
          id,
        },
      }),
      transformResponse: (response: PetAPIResponse) => {
        return response.pets[0];
      },
    }),
    getBreeds: builder.query({
      query: (animal: Animal) => ({
        url: "breeds",
        params: {
          animal,
        },
      }),
      transformResponse: (response: BreedListAPIResponse) => {
        return response.breeds;
      },
    }),
    search: builder.query({
      query: ({
        animal,
        location,
        breed,
      }: {
        animal: Animal;
        location: string;
        breed: string;
      }) => ({
        url: "pets",
        params: {
          animal,
          location,
          breed,
        },
      }),
      transformResponse: (response: PetAPIResponse) => {
        return response.pets;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPetQuery, useGetBreedsQuery, useSearchQuery } = petApi;
