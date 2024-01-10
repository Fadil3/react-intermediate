import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState,Suspense,lazy } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";

const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const results = useQuery(["details", id], fetchPet);
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const Modal = lazy(() => import("./Modal"));

  if (results.isLoading) {
    return (
      <div className="mx-auto">
        <h2 className="animate-spin">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="mt-[80px]">
      <Carousel images={pet.images} />
      <div className="mt-[80px] px-12 py-4">
        <h1 className="text-2xl font-bold text-center">{pet.name}</h1>
        <h2 className="text-xl font-semibold text-center">{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <div className="flex items-center my-4">
          <button className="mx-auto px-4 py-2 bg-orange-500 rounded-lg text-white" onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        </div>
        <p>{pet.description}</p>
        {showModal ? (
          <Suspense fallback={
            <div className="mx-auto">
              <h2 className="animate-spin">🌀</h2>
            </div>
          }>
          <Modal>
            <div className="shadow-lg rounded-lg p-5 absolute ml-auto mr-auto left-0 right-0 top-[50%] bg-slate-200 w-fit">
              <h1 className="text-2xl font-bold text-center mb-5">Would you like to adopt {pet.name}?</h1>
              <div className="flex justify-around">
                <button
                className="mx-auto px-4 py-2 bg-green-500 rounded-lg text-white"
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button className="mx-auto px-4 py-2 bg-red-500 rounded-lg text-white" onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
          </Suspense>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
