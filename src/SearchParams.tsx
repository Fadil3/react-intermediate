import { useState, useDeferredValue, useMemo } from "react";
// import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import useBreedList from "./useBreedList";
// import fetchSearch from "./fetchSearch";
import { Animal } from "./types";
// import { useSelector } from "react-redux";
import { useAppSelector } from "./hooks";
import { useSearchQuery } from "./petApiService";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);
  const adoptedPet = useAppSelector((state) => state.adoptedPet?.value);

  const { data: pets, isLoading } = useSearchQuery({
    location: requestParams.location,
    animal: requestParams.animal as Animal,
    breed: requestParams.breed,
  });

  const deferredPets = useDeferredValue(pets);
  const renderedPets = useMemo(
    () => <Results pets={pets || []} />,
    [deferredPets, pets],
  );

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const obj = {
            animal: formData.get("animal")?.toString() ?? "",
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="w-[200px]">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            className="search-input"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            className="search-input"
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            className="search-input disable-input"
            disabled={!breeds.length}
            id="breed"
            name="breed"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button className="rounded bg-orange-500 px-6 py-2 text-white hover:opacity-50">
          Submit
        </button>
      </form>
      {isLoading ? <h1>Loading...</h1> : renderedPets}
    </div>
  );
};

export default SearchParams;
