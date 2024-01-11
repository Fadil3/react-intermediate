import { Link } from "react-router-dom";
interface Pet {
  name: string;
  animal: string;
  breed: string;
  images: string[];
  location: string;
  id: number;
}
const Pet = (props: Pet) => {
  const { name, animal, breed, images, location, id } = props;

  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link
      to={`/details/${id}`}
      className="relative block opacity-90 hover:opacity-100"
    >
      <div className="h-full w-full rounded-lg">
        <img
          loading="lazy"
          src={hero}
          alt={name}
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full rounded-lg bg-gradient-to-tr from-white to-transparent px-4 py-2">
        <h1 className="text-xl font-bold">{name}</h1>
        <h2 className="font-semibold">{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
