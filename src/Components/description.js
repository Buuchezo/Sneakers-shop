import { minus, plus, cart_button } from "../Components/imagescomponent";
import { useEffect } from "react";

export function Description({ value, onSetValue, menge, onSetMenge }) {
  return (
    <div className="description">
      <p className="pre_title">SNEAKER COMPANY</p>
      <h1 className="heading">Fall Limited Edition Sneakers</h1>
      <p className="description_text">
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole, they`ll withstand everything the
        weather can offer
      </p>
      <Discount />
      <Button
        value={value}
        onSetValue={onSetValue}
        menge={menge}
        onSetMenge={onSetMenge}
      />
    </div>
  );
}

function Discount() {
  return (
    <div className="discount">
      <div className="actual_price">
        <h1>$125.00</h1>
        <h2 className="discount_percent">50%</h2>
      </div>
      <h2 className="original_price">$250.00</h2>
    </div>
  );
}

function Button({ value, onSetValue, menge, onSetMenge }) {
  function handleAddMenge() {
    onSetMenge((m) => m + value);
    onSetValue(0);
  }

  useEffect(
    function () {
      onSetMenge((menge) => menge);
    },
    [onSetMenge, menge]
  );

  function handleIncrement() {
    onSetValue((value) => value + 1);
  }
  function handleDecrement() {
    if (value <= 0) return;
    onSetValue((value) => value - 1);
  }
  return (
    <div className="orders">
      <div className="input">
        <img
          className="emoji"
          src={minus}
          alt="reduce sign"
          onClick={handleDecrement}
        />
        <input
          type="text"
          placeholder="0"
          value={value}
          onChange={(e) => onSetValue(e.target)}
        />
        <img
          className="emoji"
          src={plus}
          alt="additionsign"
          onClick={handleIncrement}
        />
      </div>
      <button className="btn" onClick={handleAddMenge}>
        <img src={cart_button} alt="shopping box" />
        <p> Add to cart</p>
      </button>
    </div>
  );
}
