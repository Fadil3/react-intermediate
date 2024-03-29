import { useNavigate, useParams } from "react-router-dom";
import { useState, Suspense, lazy } from "react";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";
import { JSX } from "react/jsx-runtime";
import { useAppDispatch } from "./hooks";
import { adopt } from "./adoptedPetSlice";
import { useGetPetQuery } from "./petApiService";

//contoh penggunaan react-query
// import fetchPet from "./fetchPet";
// import { useQuery } from "@tanstack/react-query";

const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  //contoh penggunaan react-query
  // const results = useQuery(["details", id as string], fetchPet);
  // bisa akses results.isLoading, results.data, results.error

  const { isLoading, data: pet } = useGetPetQuery(id as string);

  const dispatch = useAppDispatch();

  const Modal = lazy(() => import("./Modal"));

  if (isLoading) {
    return (
      <div className="mx-auto">
        <h2 className="animate-spin">🌀</h2>
      </div>
    );
  }

  if (!pet) {
    throw new Error("pet not found");
  }

  return (
    <div className="mt-[80px]">
      <Carousel images={pet.images} />
      <div className="mt-[80px] px-12 py-4">
        <h1 className="text-center text-2xl font-bold">{pet.name}</h1>
        <h2 className="text-center text-xl font-semibold">{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <div className="my-4 flex items-center">
          <button
            className="mx-auto rounded-lg bg-orange-500 px-4 py-2 text-white"
            onClick={() => setShowModal(true)}
          >
            Adopt {pet.name}
          </button>
        </div>
        <p>{pet.description}</p>
        {showModal ? (
          <Suspense
            fallback={
              <div className="mx-auto">
                <h2 className="animate-spin">🌀</h2>
              </div>
            }
          >
            <Modal>
              <div className="absolute left-0 right-0 top-[50%] ml-auto mr-auto w-fit rounded-lg bg-slate-200 p-5 shadow-lg">
                <h1 className="mb-5 text-center text-2xl font-bold">
                  Would you like to adopt {pet.name}?
                </h1>
                <div className="flex justify-around">
                  <button
                    className="mx-auto rounded-lg bg-green-500 px-4 py-2 text-white"
                    onClick={() => {
                      dispatch(adopt(pet));
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="mx-auto rounded-lg bg-red-500 px-4 py-2 text-white"
                    onClick={() => setShowModal(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </Modal>
          </Suspense>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props: JSX.IntrinsicAttributes) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
