/* eslint-disable @typescript-eslint/await-thenable */
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Carousel from "../Carousel";

test("display first image", async () => {
  const images = ["1.jpg", "2.jpg", "3.jpg"];

  const carousel = render(<Carousel images={images} />);
  const hero = (await carousel.findByTestId("hero")) as HTMLImageElement;
  expect(hero.src).toContain(images[0]);
  carousel.unmount();
});

test("user clicks on thumbnail and hero image change", async () => {
  const images = ["1.jpg", "2.jpg", "3.jpg"];
  const carousel = render(<Carousel images={images} />);

  const hero = (await carousel.findByTestId("hero")) as HTMLImageElement;
  expect(hero.src).toContain(images[0]);

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    const thumbnail = (await carousel.findByTestId(
      `thumbnail-${i}`,
    )) as HTMLImageElement;

    await thumbnail.click();
    expect(hero.src).toContain(image);
  }

  carousel.unmount();
});
