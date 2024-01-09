import { Link } from "react-router-dom";

const Pet = (props) => {
  const { name, animal, breed, images, location, id } = props;

  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="relative block opacity-90 hover:opacity-100">
      <div className="w-full h-full rounded-lg">
        <img loading="lazy" src={hero} alt={name} className="h-full w-full object-cover rounded-lg" />
      </div>
      <div className="w-full absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent px-4 py-2 rounded-lg">
        <h1 className="text-xl font-bold">{name}</h1>
        <h2 className="font-semibold">{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
