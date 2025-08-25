import Modal from "./Modal";
import { CartContext } from "../store/CartContext";
import { use, useState, useRef } from "react";
import Input from "../UI/Input";
import { useActionState } from "react";
import Error from "../UI/Error";

export default function Checkout({ ref }) {
  const [error, setError] = useState(false);
  const { totalPrice, orderedMeals, setOrderedMeals } = use(CartContext);
  const successfull = useRef();

  function handleCloseCheckout() {
    ref.current.close();
  }

  function handleCloseSuccess() {
    successfull.current.close();
  }
  function handleopenSuccess() {
    successfull.current.showModal();
  }

  async function handleSubmitForm(prevFormData, formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const street = formData.get("street");
    const postal = formData.get("postal");
    const city = formData.get("city");

    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: { items: orderedMeals },
          customer: { name, email, street, "postal-code": postal, city },
        },
      }),
    });
    if (!response.ok) {
      setError(true);
    }
    setOrderedMeals([]);
    handleCloseCheckout();
    handleopenSuccess();
  }

  const [formState, formAction, pending] = useActionState(handleSubmitForm);
  return (
    <Modal ref={ref} onClose={handleCloseCheckout}>
      <h2>Checkout</h2>
      <p>Total Amount : ${totalPrice}</p>
      <form action={formAction}>
        <Input label="Full Name" name="name" />
        <Input type="email" label="E-Mail Address" name="email" />
        <Input label="Street" name="street" />
        <div className="control-row">
          <Input type="number" label="Postal Code" name="postal" />
          <Input label="City" name="city" />
        </div>
        {error && (
          <Error
            title="Error while sending response"
            message="please Check your internet connection"
          />
        )}
        {pending ? (
          <p className="modal-actions">sending your order</p>
        ) : (
          <div className="modal-actions">
            <button
              type="button"
              onClick={handleCloseCheckout}
              className="text-button"
            >
              close
            </button>
            <button type="submit" className="button">
              Submit Order
            </button>
          </div>
        )}
      </form>
      <Modal ref={successfull} className="modal">
        <h2>Submited successfully </h2>
        <p>We will get Back to you very soon </p>
        <p className="modal-actions">
          <button onClick={handleCloseSuccess} className="button">
            Okay
          </button>
        </p>
      </Modal>
    </Modal>
  );
}
