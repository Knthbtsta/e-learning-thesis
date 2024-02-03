import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";
import Card from "./Card"; // Import your Card component

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

  return (
    <div
      className=""
      style={{
        width: props.width,
        height: props.height,
        margin: props.margin,
        overflow: "hidden", // Add this style to hide the overflow
      }}
    >
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
        renderItem={(item, index) => (
          <div key={index} style={{ margin: "0 10px" }}> {/* Adjust the margin value based on your preference */}
            <Card {...item} /> {/* Pass the item props to your Card component */}
          </div>
        )}
      />
    </div>
  );
}
