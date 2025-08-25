import { useRef } from "react";
import Cart from "./Cart";
import { CartContext } from "../store/CartContext";
import { use } from "react";
export default function Header() {
  const { orderedMeals } = use(CartContext);
  const cart = useRef();
  function handleShowModal() {
    cart.current.showModal();
  }
  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src="logo.jpg" alt="logo" />
          <h1>REACT FOOD</h1>
        </div>
        <button className="text-button" onClick={handleShowModal}>
          cart{orderedMeals.length > 0 ? "(" + orderedMeals.length + ")" : null}
        </button>
      </header>
      <Cart ref={cart} />
    </>
  );
}
