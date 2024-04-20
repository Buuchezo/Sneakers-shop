import React, { useState } from "react";

import {
  close,
  pic,
  pic1,
  pic2,
  pic3,
  next,
  previous,
  thumbnail1,
  thumbnail2,
  thumbnail3,
  thumbnail4,
} from "../Components/imagescomponent";

const images = [
  { url: pic, title: "first sneaker" },
  { url: pic1, title: "second sneaker" },
  { url: pic2, title: "third sneaker" },
  { url: pic3, title: "forth sneaker" },
];
const thumbnails = [
  { url: thumbnail1, title: "first sneaker" },
  { url: thumbnail2, title: "second sneaker" },
  { url: thumbnail3, title: "third sneaker" },
  { url: thumbnail4, title: "forth sneaker" },
];

export function Images() {
  return (
    <div className="main_image_container">
      <ImageSlideComponent imageurls={images} />
    </div>
  );
}

function Button({ className, children }) {
  return <div className={className}>{children}</div>;
}

function ImageSlideComponent({ imageurls }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowmodal] = useState(false);

  function handleShowModal() {
    setShowmodal(true);
  }
  function handleCloseModal() {
    setShowmodal(false);
  }

  function handleNext() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageurls.length);
  }

  function handlePrevious() {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageurls.length) % imageurls.length
    );
  }

  function handleChangePicture(index) {
    setCurrentIndex(index);
  }

  return (
    <div className="main_image">
      <Button className="RightArrow">
        <img onClick={handleNext} src={next} alt="forward" />
      </Button>
      <Button className="LeftArrow">
        <img onClick={handlePrevious} src={previous} alt="back" />
      </Button>
      <div className="image_slider">
        {imageurls.map((image, i) => (
          <img
            className="slider_image"
            src={image.url}
            alt={image.title}
            key={i}
            onClick={handleShowModal}
            style={{ transform: `translateX(${-100 * currentIndex}%)` }}
          />
        ))}
      </div>
      <div id="thumbnails">
        {thumbnails.map((thumbnail, i) => (
          <img
            src={thumbnail.url}
            alt={thumbnail.title}
            key={i}
            onClick={() => handleChangePicture(i)}
          />
        ))}
      </div>
      <div> {showModal && <ModalBox onCloseClick={handleCloseModal} />}</div>
    </div>
  );
}

function ModalBox({ onCloseClick }) {
  return (
    <div className="modal_container" onClick={onCloseClick}>
      {/* This prevents the click from bubbling up to the parent */}
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <ImageSlideComponent imageurls={images} />
      </div>

      <div className="close_modal">
        <img
          id="close_modal"
          src={close}
          alt="close button"
          onClick={onCloseClick}
        />
      </div>
    </div>
  );
}
