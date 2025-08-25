import Header from "./components/Header";
import Meals from "./components/Meals";
import Checkout from "./components/Checkout";
import CartContextProvider from "./store/CartContext";
function App() {
  return (
    <CartContextProvider>
      <Checkout></Checkout>
      <Header />
      <Meals />
    </CartContextProvider>
  );
}

export default App;
