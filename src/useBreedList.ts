// // eslint-disable-next-line import/named
// import { QueryStatus, useQuery } from "@tanstack/react-query";
// import fetchBreedList from "./fetchBreedList";

import { useGetBreedsQuery } from "./petApiService";
import { Animal } from "./types";

export default function useBreedList(animal: Animal) {
  // const results = useQuery(["breeds", animal], fetchBreedList);
  // return [results?.data?.breeds ?? [], results.status] as [
  //   string[],
  //   QueryStatus,
  // ];

  const { data: breeds, isLoading } = useGetBreedsQuery(animal, {
    skip: !animal,
  });

  return [breeds ?? [], isLoading] as [string[], boolean];
}
