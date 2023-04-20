import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct, selectSingleProduct } from "./singleProductSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const singleProduct = useSelector(selectSingleProduct);
  const { id, name, description, imageUrl, price, inStock } = singleProduct;

  if (!singleProduct) {
    return <p className="error">Oops! Product not found.</p>;
  }

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch]);

  return (
    <div className="single-product column">
      <h1 className="product-name">{name}</h1>
      <h2 className="product-description">{description}</h2>
      <h3>Image:</h3>
      <img className="product-image" src={imageUrl} />
      <h3 className="product-price">${price}</h3>
      <p className="product-info">ID Number: {id}</p>
      <p className="product-info">Item in Stock: {inStock}</p>

      {description && description.length
        ? description.split("\n").map((line, idx) => (
            <p className="product-story" key={`product story key:${idx}`}>
              {line}
            </p>
          ))
        : null}
    </div>
  );
};

export default SingleProduct;
