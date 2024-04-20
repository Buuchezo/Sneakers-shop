import { useState } from "react";
import {
  close,
  deletesvg,
  thumbnail,
  line,
  plus,
  minus,
} from "../Components/imagescomponent";

export function ShoppingCart({
  value,
  menge,
  onSetOpenCart,
  onSetMenge,
  onSetValue,
}) {
  function handleCloseCart() {
    onSetOpenCart(false);
  }
  return (
    <div className="shopping_cart">
      <div className="close_cart">
        <h2 className="cart_name">Shopping Cart</h2>
        <img
          id="close_cart"
          src={close}
          alt="close button"
          onClick={handleCloseCart}
        />
      </div>
      <img src={line} alt="divider" />
      {menge <= 0 ? (
        <ShoppingCartEmpty />
      ) : (
        <ShoppingCartFull
          menge={menge}
          onSetMenge={onSetMenge}
          onSetValue={onSetValue}
          value={value}
        />
      )}
    </div>
  );
}

function ShoppingCartEmpty() {
  return (
    <div id="products">
      <span>Your Shopping Cart is empty.</span>
    </div>
  );
}

function ShoppingCartFull({ menge, onSetMenge, onSetValue }) {
  const [adjust, setAdjust] = useState(false);
  const [value, setValue] = useState("");
  const [cartValue, setCartValue] = useState(menge);
  const [count, setCount] = useState(0);
  const [disable, setDisable] = useState(false);
  const [disable1, setDisable1] = useState(false);

  function handleDelete() {
    onSetMenge(0);
    onSetValue(0);
  }

  function handleDecrement() {
    if (cartValue <= 0) return;
    // onSetMenge((menge) => menge - 1);
    setCartValue((cartValue) => cartValue - 1);
    setAdjust(true);
    setValue("Reduce");
    setCount((count) => count + 1);
    setDisable1(true);
  }
  function handleIncrement() {
    // onSetMenge((menge) => menge + 1);
    setCartValue((cartValue) => cartValue + 1);
    setAdjust(true);
    setValue("Add");
    setCount((count) => count + 1);
    setDisable(true);
  }

  function handleAdjust() {
    onSetMenge(cartValue);
    setAdjust(false);
    setCount(0);
    setDisable1(false);
    setDisable(false);
  }

  return (
    <div id="products">
      <div className="summary">
        <img className="thumbnail" src={thumbnail} alt="shoes" />
        <div>
          <p className="article">Fall Limited Edition Sneakers</p>
          <div className="cart_calculation ">
            <div className="reduce" onClick={handleDecrement}>
              <button className="minusbtn" disabled={disable}>
                <img src={minus} alt="minus sign" />
              </button>
            </div>
            <p>
              $125.00 x {cartValue}
              <strong>${125 * Number(cartValue)}</strong>
            </p>

            <div className="add" onClick={handleIncrement}>
              <button className="minusbtn" disabled={disable1}>
                <img src={plus} alt="plus sign" />
              </button>
            </div>
          </div>
        </div>
        <img className="bin" src={deletesvg} alt="bin" onClick={handleDelete} />
      </div>

      {!adjust ? (
        <button className="checkout_btn">Checkout</button>
      ) : (
        <button className="checkout_btn" onClick={handleAdjust}>
          {`${value}
          ${count} ${count > 1 ? "Items" : "Item"}`}
        </button>
      )}
    </div>
  );
}
