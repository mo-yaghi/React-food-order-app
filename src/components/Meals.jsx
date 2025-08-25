import { useEffect, useState } from "react";
import { CartContext } from "../store/CartContext";
import { use } from "react";
export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [errors, setErrors] = useState(null);
  const { addMeal } = use(CartContext);

  useEffect(() => {
    async function fetchMeals() {
      const respose = await fetch("/available-meals.json");
      const data = await respose.json();
      if (!respose.ok) {
        setErrors("Failed to fetch the Meals");
        return;
      }
      setMeals(data);
    }
    fetchMeals();
  }, []);

  return (
    <main>
      <ul id="meals">
        {meals.map((meal, index) => (
          <li key={meal.id} id={meal.id} className="meal-item">
            <img src={`/${meal.image}`} />
            <h3>{meal.name}</h3>
            <p className="meal-item-price">{`$ ${meal.price}`}</p>
            <p className="meal-item-description">{meal.description}</p>
            <div className="meal-item-actions">
              <button
                className="button"
                onClick={() => addMeal(meal.id, meal.name, meal.price)}
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
