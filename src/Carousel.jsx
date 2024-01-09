import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="flex flex-col justify-around items-center h-[400px] mt-20">
        <img src={images[active]} alt="animal" className=" max-w-[45%] max-h-[400px]" />
        <div className=" w-[50%]">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={`h-[100px] w-[100px] rounded-[50%] inline-block m-4 cursor-pointer border-2 border-[#555] ${index === active && 'opacity-50'}`}
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
