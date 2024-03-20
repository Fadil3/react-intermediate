import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";
import Pet from "../Pet";

test("Dislay a default thumbnail", async () => {
  const pet = render(
    <StaticRouter location={""}>
      <Pet
        animal={"dog"}
        name={"Luna"}
        breed={"Havanese"}
        images={[]}
        location={"Seattle, WA"}
        id={1}
      />
    </StaticRouter>,
  );

  const petThumbnail = await pet.findByTestId("pet-thumbnail");
  expect(petThumbnail.getAttribute("src")).toBe(
    "http://pets-images.dev-apis.com/pets/none.jpg",
  );
  pet.unmount();
});

test("Display a non-default thumbnail", async () => {
  const pet = render(
    <StaticRouter location={""}>
      <Pet
        animal={"dog"}
        name={"Luna"}
        breed={"Havanese"}
        images={["1.jpg", "2.jpg", "3.jpg"]}
        location={"Seattle, WA"}
        id={1}
      />
    </StaticRouter>,
  );

  const petThumbnail = await pet.findByTestId("pet-thumbnail");
  expect(petThumbnail.getAttribute("src")).toBe("1.jpg");
  pet.unmount();
});
