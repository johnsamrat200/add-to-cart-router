import { useState } from "react";
import Navbar from "../components/Navbar";

const CartPage = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  const updateQuantity = (id, delta) => {
    const updatedCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = total * 0.1;
  const finalPrice = total - discount;

  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar cartCount={cart.length} />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800"> Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="flex flex-wrap  items-center justify-between border-b pb-4"
                >
                  {/* Product Info */}
                  <div className="flex items-center space-x-4 p-2.5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain rounded"
                    />
                    <div>
                      <h2 className="font-semibold text-gray-700">{item.title}</h2>
                      <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2 p-2.5">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-3 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex items-center space-x-4 p-2.5">
                    <span className="font-semibold text-gray-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-6  pt-4 text-right">
              <p className="text-lg">
                <span className="font-semibold">Total:</span> ${total.toFixed(2)}
              </p>
              <p className="text-lg text-green-600">
                <span className="font-semibold">Discount (10%):</span> -${discount.toFixed(2)}
              </p>
              <p className="text-2xl font-bold mt-2">
                Final Price: ${finalPrice.toFixed(2)}
              </p>
              <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
