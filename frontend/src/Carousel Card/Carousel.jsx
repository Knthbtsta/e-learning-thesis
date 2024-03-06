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
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(null);

  const [cards] = useState(table);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);

  const handlePrev = () => {
    setGoToSlide((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setGoToSlide((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
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
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={props.showArrows}
        onPrevClick={handlePrev}
        onNextClick={handleNext}
        animationConfig={config.gentle}
        renderItem={(item, index) => (
          <div key={index} style={{ margin: "0 10px" }}>
            <Card {...item} />
          </div>
        )}
      />
    </div>
  );
}
