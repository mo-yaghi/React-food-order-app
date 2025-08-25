import { createContext, useState } from "react";

export const CartContext = createContext({
  meals: [],
  totalPrice: 0,
  addMeal: () => {},
});

export default function CartContextProvider({ children }) {
  const [orderedMeals, setOrderedMeals] = useState([]);

  const totalPrice =
    orderedMeals?.reduce((acc, meal) => acc + +meal.price * meal.quantity, 0) ??
    0;

  function addMeal(id, name, price) {
    setOrderedMeals((prevMeals) => {
      const exsistingMeal = prevMeals.findIndex((meal) => id === meal.id);
      if (exsistingMeal !== -1) {
        const updatedMeals = [...prevMeals];
        updatedMeals[exsistingMeal] = {
          ...updatedMeals[exsistingMeal],
          quantity: updatedMeals[exsistingMeal].quantity + 1,
        };
        return updatedMeals;
      } else {
        return [...prevMeals, { id, name, price, quantity: 1 }];
      }
    });
  }

  function removeMeal(index) {
    setOrderedMeals((prevMeals) => {
      if (prevMeals[index]?.quantity > 1) {
        const updatedMeals = [...prevMeals];
        updatedMeals[index] = {
          ...updatedMeals[index],
          quantity: updatedMeals[index].quantity - 1,
        };
        return updatedMeals;
      } else {
        return prevMeals.splice(index, 1);
      }
    });
  }

  const contextValue = {
    orderedMeals,
    setOrderedMeals,
    totalPrice,
    addMeal,
    removeMeal,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
