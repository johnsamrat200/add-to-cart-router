import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then(res => setProducts(res.data));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const toggleCartItem = (product) => {
    if (cart.find(item => item.id === product.id)) {
      setCart(cart.filter(item => item.id !== product.id));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div>
      <Navbar cartCount={cart.length} />
      <div className="bg-blue-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={toggleCartItem}
            inCart={!!cart.find(item => item.id === product.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
