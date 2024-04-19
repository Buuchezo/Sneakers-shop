import React, { useState, useEffect, useRef } from "react";
import { useImageObserver } from "../Components/observer";
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

const images = [pic, pic1, pic2, pic3];
const thumbnails = [thumbnail1, thumbnail2, thumbnail3, thumbnail4];

export function Images({ menge, openCart }) {
  const elementRef = useRef(null);
  const [elementWidth, setElementWidth] = useState(0);

  useImageObserver(elementRef, setElementWidth);

  return (
    <div className="main_image">
      {/* mobile version image design/component */}
      <ImageSlideComponent
        menge={menge}
        openCart={openCart}
        elementWidth={elementWidth}
        elementRef={elementRef}
      />
      {/* desktop version image design/component */}
      <ImageDesignDesktop elementWidth={elementWidth} elementRef={elementRef} />
    </div>
  );
}

function Image({ image, style, elementRef }) {
  return <img style={style} src={image} alt="shoes" ref={elementRef} />;
}

function Button({ idRight, idLeft, className, onClickNext, onClickPrevious }) {
  return (
    <div className={className}>
      <img onClick={onClickPrevious} id={idLeft} src={previous} alt="return" />
      <img onClick={onClickNext} id={idRight} src={next} alt="forward" />
    </div>
  );
}

function ImageSlideComponent({ elementRef, elementWidth }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleNext() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  function handlePrevious() {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }

  const translation = -(elementWidth / 10) * currentIndex;

  return (
    <div className="main_component">
      <div>
        <div className="mobile_version">
          {images.map((image, i) => (
            <Image
              image={image}
              key={i}
              style={{
                transform: `translateX(${translation}rem)`,
                transition: "all 0.4s ease-in",
              }}
              elementRef={elementRef}
            />
          ))}
          <Button
            idLeft="scroll_left"
            idRight="scroll_right"
            className="scrolls"
            onClickNext={handleNext}
            onClickPrevious={handlePrevious}
          />
        </div>
      </div>
    </div>
  );
}

function ImageDesignDesktop() {
  const [filter, setFilter] = useState(``);
  const [destopIndex, setDesktopIndex] = useState(0);
  const [image, setImage] = useState(images[destopIndex]);
  const [showModal, setShowmodal] = useState(false);
  function handleShowModal() {
    setShowmodal(true);
  }
  function handleCloseModal() {
    setShowmodal(false);
  }

  function handleChangePicture(index) {
    setDesktopIndex(index);
    setImage(images[index]);
  }

  useEffect(
    function () {
      if (destopIndex) {
        setFilter("grayscale(30%)blur(1px)");
      }
    },
    [destopIndex]
  );

  return (
    <div>
      <img
        className="desktop_version"
        src={image}
        alt="shoes"
        onClick={handleShowModal}
      />
      <div id="thumbnails">
        {thumbnails.map((thumbnail, i) => (
          <img
            src={thumbnail}
            alt={`nm ${i}`}
            key={i}
            style={{ filter: destopIndex === i ? filter : "none" }}
            onClick={() => handleChangePicture(i)}
          />
        ))}
      </div>
      {showModal && (
        <ModalBox
          filter={filter}
          destopIndex={destopIndex}
          onSetFilter={setFilter}
          onCloseClick={handleCloseModal}
        />
      )}
    </div>
  );
}

function ModalBox({ onCloseClick }) {
  const elementRef = useRef(null);
  const [elementWidth, setElementWidth] = useState(0);

  useImageObserver(elementRef, setElementWidth);

  const [index, setIndex] = useState(0);

  function handleModalChangePicture(index) {
    setIndex(index);
  }

  function handleModalNext() {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  function handleModalPrevious() {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }

  const translation = -(elementWidth / 10) * index;

  return (
    <div className="modal_container" onClick={onCloseClick}>
      {/* This prevents the click from bubbling up to the parent */}
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <img
          id="rightt"
          src={next}
          alt="close button"
          onClick={handleModalNext}
        />
        <img
          id="leftt"
          src={previous}
          alt="close button"
          onClick={handleModalPrevious}
        />
        <div className="modal_version">
          {images.map((image, i) => (
            <Image
              image={image}
              key={i}
              style={{
                transform: `translateX(${translation}rem)`,
                transition: "all 0.5s ease-in",
              }}
              elementRef={elementRef}
            />
          ))}
        </div>
        <div id="thumbnails">
          {thumbnails.map((img, i) => (
            <img
              src={img}
              alt={i}
              onClick={() => handleModalChangePicture(i)}
              key={i}
            />
          ))}
        </div>
      </div>
      {/* onClick={onCloseClick} */}
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
