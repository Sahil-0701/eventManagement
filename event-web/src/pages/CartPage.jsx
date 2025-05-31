import React, { useContext } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const CartPage = () => {
  const { cart, updateTicketCount, removeFromCart, getTotalPrice } = useCart();
     const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProceedToBooking = () => {
     if (!user) {
      navigate("/signin");
      return;
    }
   
    console.log("CartPage - Current cart items:", cart);
    
   
    localStorage.setItem("cartItems", JSON.stringify(cart));
    console.log("CartPage - Stored cart items in localStorage");
    
    navigate("/booking-info");
  };

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center min-h-[80vh]">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate("/collection")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Browse Events
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl min-h-[80vh] mx-auto p-8">
      <h1 className="text-3xl text-center font-semibold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border rounded-lg p-6 shadow"
          >
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.eventTitle}</h2>
              <p className="text-gray-700">
                Price per ticket:{" "}
                <span className="font-semibold">
                  ${item.ticketPrice.toFixed(2)}
                </span>
              </p>
              <p className="text-gray-700">
                Available seats:{" "}
                <span className="font-semibold">{item.availableSeats}</span>
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => updateTicketCount(item._id, item.quantity - 1)}
                disabled={item.quantity === 1}
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Decrease ticket count"
              >
                -
              </button>

              <span className="text-xl font-semibold">{item.quantity}</span>

              <button
                onClick={() => updateTicketCount(item._id, item.quantity + 1)}
                disabled={item.quantity === item.availableSeats}
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Increase ticket count"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item._id)}
                className="ml-4 text-red-600 hover:text-red-800"
                aria-label="Remove event from cart"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 border rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-2xl font-bold text-green-600">
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>

        <button
          onClick={handleProceedToBooking}
          className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Proceed to Booking
        </button>
      </div>
    </div>
  );
};

export default CartPage;
