import { Component, MouseEvent } from "react";

interface CarouselProps {
  images: string[];
}

class Carousel extends Component<CarouselProps> {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event: MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) return;

    if (event.target.dataset.index) {
      this.setState({
        active: +event.target.dataset.index,
      });
    }
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="mt-20 flex h-[400px] flex-col items-center justify-around">
        <img
          src={images[active]}
          alt="animal"
          className=" max-h-[400px] max-w-[45%]"
        />
        <div className=" w-[50%]">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={`m-4 inline-block h-[100px] w-[100px] cursor-pointer rounded-[50%] border-2 border-[#555] ${
                index === active && "opacity-50"
              }`}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
