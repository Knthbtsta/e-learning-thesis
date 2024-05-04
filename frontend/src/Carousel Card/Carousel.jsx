import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Card from "./Card";

export default function Carroussel(props) {
  const table = props.cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index), index: index };
  });

  const [offsetRadius, setOffsetRadius] = useState(6);
  const [goToSlide, setGoToSlide] = useState(null);

  useEffect(() => {
    setOffsetRadius(props.offset);
  }, [props.offset]);

  const handlePrev = () => {
    if (props.prev) {
      props.prev();
    } else {
      setGoToSlide((prev) => (prev === 0 ? table.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (props.next) {
      props.next();
    } else {
      setGoToSlide((prev) => (prev === table.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div
      className=""
      style={{
        position: "relative",
        width: props.width,
        height: props.height,
        margin: props.margin,
        overflow: "hidden",
      }}
    >
      {/* Previous Button */}
      <button
        className="prev-btn"
        onClick={handlePrev}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          zIndex: "10",
        }}
      >
        <FaArrowLeft size={40} />
      </button>

      <Carousel
        slides={table}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={props.showArrows}
        animationConfig={config.gentle}
        renderItem={(item, index) => (
          <div key={index} style={{ margin: "0 10px" }}>
            <Card {...item} />
          </div>
        )}
      />

      {/* Next Button */}
      <button
        className="next-btn"
        onClick={handleNext}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          zIndex: "10",
        }}
      >
        <FaArrowRight size={40} />
      </button>
    </div>
  );
}
