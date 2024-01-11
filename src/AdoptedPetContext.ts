import { createContext } from "react";
import { Pet } from "./types";

const AdoptedPetContext = createContext<
  [Pet | null, (adoptedPet: Pet) => void]
>([
  {
    id: 0,
    name: "",
    animal: "dog",
    description: "",
    breed: "",
    images: [],
    state: "",
    location: "",
    city: "",
  },
  () => {},
]);

export default AdoptedPetContext;
