
import { FaLongArrowAltRight } from "react-icons/fa";
import banner from "../../assets/images/world.png";

const HeroSection = () => {
  return (
    <main className="hero-section">
      <div className="container grid grid-three-cols">
        <div className="hero-content">
          <h1 className="heading-xl">
            Explore the world, One Country at a Time.
          </h1>

          <p className="paragraph">
            Discover the history, culture, and beauty of every nation. Sort,
            search, and filter through countries to find the details you need.
          </p>

          <button className="btn btn-darken btn-inline bg-white-box">
            Start Exploring <FaLongArrowAltRight />
          </button>
        </div>

        <div className="hero-image">
          <img
            src={banner}
            alt="world is beauty"
            className="banner-image"
          />
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
