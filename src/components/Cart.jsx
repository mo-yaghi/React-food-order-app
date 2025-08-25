import Modal from "./Modal";
import { CartContext } from "../store/CartContext";
import { use, useRef } from "react";
import Checkout from "./Checkout";
export default function Cart({ ref }) {
  const { orderedMeals, totalPrice, addMeal, removeMeal } = use(CartContext);
  const checkout = useRef();

  function handleCheckout() {
    handleCloseCart();
    checkout.current.showModal();
  }
  function handleCloseCart() {
    ref.current.close();
  }
  return (
    <Modal ref={ref}>
      <div className="cart">
        <h2>Your Cart</h2>
        <ul>
          {orderedMeals.length > 0 ? (
            orderedMeals.map((meal, index) => (
              <li key={meal.id} className="cart-item">
                <p>
                  {meal.name} - {meal.quantity} x ${meal.price}
                </p>

                <p className="cart-item-actions">
                  <button onClick={() => removeMeal(index)}>-</button>
                  {meal.quantity}
                  <button
                    onClick={() => addMeal(meal.id, meal.name, meal.price)}
                  >
                    +
                  </button>
                </p>
              </li>
            ))
          ) : (
            <h4 className="center">No Ordered Meals yet.... </h4>
          )}
        </ul>
        <h3 className="cart-total">{totalPrice ? "$" + totalPrice : null}</h3>
        <form className="modal-actions">
          <button
            type="button"
            onClick={handleCloseCart}
            className="text-button"
          >
            colse
          </button>
          <button
            className="button"
            formAction={() => handleCheckout(totalPrice)}
          >
            Go to Checkout
          </button>
        </form>
        <Checkout ref={checkout} />
      </div>
    </Modal>
  );
}
