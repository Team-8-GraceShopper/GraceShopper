import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../product/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.me.username);
  const products = useSelector((state) => state.product.list);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % products.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentSlide, products.length]);

  return (
    <div className="home-container">
      <h3>Welcome, {username}</h3>
      {products.length > 0 && (
        <div className="slideshow-container">
          <div className="slideshow">
            <img
              src={products[currentSlide].imageUrl}
              alt={products[currentSlide].name}
              className="slide"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
