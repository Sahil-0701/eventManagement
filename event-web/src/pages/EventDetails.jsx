import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/ApiService";
import { getOptimizedImage } from "../helper/getOptimizedImage";
import { Skeleton } from "@mui/material";
import { useCart } from "../context/CartContext";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [fadeImage, setFadeImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, updateTicketCount } = useCart();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/event/single/${id}`);
        setProduct(response.data.event);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.eventImages?.length > 0) {
      setMainImage(product.eventImages[0]);
    }
  }, [product]);

  const handleThumbnailClick = (img) => {
    if (img === mainImage) return;
    setFadeImage(true);
    setTimeout(() => {
      setMainImage(img);
      setFadeImage(false);
    }, 300);
  };
const cartItem = product ? cart.find(item => item._id === product._id) : null;
const isInCart = !!cartItem;
const currentCount = isInCart ? cartItem.quantity : 0;

const handleAddToCart = () => {
  if (!product) return;

  if (isInCart) {
    if (currentCount < product.totalSeats) {
      updateTicketCount(product._id, currentCount + 1);
    } else {
      alert("No more tickets available.");
    }
  } else {
    addToCart(product);
  }
};


  if (loading) {
    return (
      <div className="w-full mx-auto px-4 py-10 bg-white min-h-[70vh] max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2 flex flex-col">
            <Skeleton
              variant="rectangular"
              width="100%"
              height={450}
              className="rounded-lg mb-4"
            />
            <div className="flex space-x-4 overflow-x-auto">
              {[...Array(4)].map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width={96}
                  height={96}
                  className="rounded-lg flex-shrink-0"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <Skeleton variant="text" width="80%" height={48} />
            <Skeleton variant="text" width="100%" height={30} />
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="text" width="70%" height={24} />
            <Skeleton variant="text" width="50%" height={24} />
            <Skeleton variant="text" width="90%" height={24} />
            <Skeleton
              variant="rectangular"
              width={160}
              height={48}
              className="rounded-lg mt-4"
            />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="w-full mx-auto px-4 py-10 bg-white min-h-[70vh] max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2 flex flex-col">
          {mainImage && (
            <img
              src={mainImage}
              alt={product.eventTitle}
              className={`w-full h-[450px] object-cover rounded-lg shadow-md transition-opacity duration-300 mb-4 ${
                fadeImage ? "opacity-0" : "opacity-100"
              }`}
              loading="lazy"
            />
          )}

          <div className="flex space-x-4 overflow-x-auto">
            {product.eventImages?.map((img, index) => (
              <img
                key={index}
                src={getOptimizedImage(img)}
                alt={`${product.eventTitle} Thumbnail ${index + 1}`}
                className={`w-24 h-24 object-cover rounded-lg border-2 cursor-pointer flex-shrink-0 transition-transform duration-150 hover:scale-105 ${
                  mainImage === img ? "border-blue-600" : "border-gray-200"
                }`}
                onClick={() => handleThumbnailClick(img)}
                loading="lazy"
                role="button"
                aria-label={`View image ${index + 1}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleThumbnailClick(img);
                  }
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-start space-y-6">
          <h1 className="text-4xl font-semibold">{product.eventTitle}</h1>
          <p className="text-gray-700 text-lg">{product.eventDescription}</p>
          <p className="text-3xl font-bold text-green-600">
            ${product.ticketPrice.toFixed(2)}
          </p>

          <div className="space-y-1 text-gray-700 text-md">
            <p>
              <span className="font-semibold text-gray-800">Venue:</span>{" "}
              {product.venue}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Date:</span>{" "}
              {new Date(product.eventDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Time:</span>{" "}
              {product.startTime} - {product.endTime}
            </p>
            <p>
              <span className="font-semibold text-gray-800">
                Available Seats:
              </span>{" "}
              {product.totalSeats}
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4 max-w-xs w-full mx-auto">
            <button
              onClick={handleAddToCart}
              className="w-full px-8 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              {isInCart
                ? `Add Another Ticket (${currentCount} in Cart)`
                : "Add to Cart"}
            </button>
             <button
              onClick={() => navigate("/cart")}
              className="w-full px-8 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
