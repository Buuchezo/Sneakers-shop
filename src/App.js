import "./App.css";
import { Images } from "./Components/images";
import { Description } from "./Components/description";
import { useState } from "react";
import { ShoppingCart } from "./Components/cart";
import { menu, cart, avatar, logo, close } from "./Components/imagescomponent";

export default function App() {
  const [menge, setMenge] = useState(0);
  const [openCart, setOpenCart] = useState(false);
  const [value, setValue] = useState(0);

  return (
    <>
      <div className="app">
        <Nav
          onSetMenge={setMenge}
          menge={menge}
          openCart={openCart}
          setOpenCart={setOpenCart}
          onSetValue={setValue}
          value={value}
        />
        <div className="desktop_partition">
          <Images />
          <Description
            value={value}
            onSetValue={setValue}
            menge={menge}
            onSetMenge={setMenge}
          />
        </div>
      </div>
    </>
  );
}
function Nav({ value, menge, onSetMenge, openCart, setOpenCart, onSetValue }) {
  const [isOpen, setIsopen] = useState(false);

  function handleOpenCart() {
    setOpenCart(true);
  }

  function handleClick() {
    setIsopen((isOpen) => !isOpen);
  }

  return (
    <div className="navbar">
      <div className="logo">
        <div className="logo_image">
          <img
            className="menu_logo"
            src={menu}
            alt="menu button"
            onClick={handleClick}
          />
        </div>

        <img className="logos" src={logo} alt="menu button" />
      </div>
      <NavLinks isOpen={isOpen} onClick={handleClick} />
      <ul className="large_screen">
        <li>Collection</li>
        <li>Men</li>
        <li>Women</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="cart">
        {menge > 0 && <span className="cart_counter">{menge}</span>}
        <div className="cart_image">
          <img src={cart} alt="cart button" onClick={handleOpenCart} />
        </div>
        <img className="avatar" src={avatar} alt="customer" />
      </div>
      <div className="main_component">
        {/* When opencart is true then the shopping Cart appears */}
        {openCart && (
          <ShoppingCart
            value={value}
            onSetValue={onSetValue}
            onSetMenge={onSetMenge}
            menge={menge}
            onSetOpenCart={setOpenCart}
          />
        )}
      </div>
    </div>
  );
}
function NavLinks({ isOpen, onClick }) {
  return (
    <div
      onClick={onClick}
      className={isOpen ? "links transition" : "links transition_back"}
    >
      <img src={close} alt="cross button" />
      <ul>
        <li>Collection</li>
        <li>Men</li>
        <li>Women</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
}