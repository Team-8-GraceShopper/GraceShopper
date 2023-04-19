import React, { useEffect } from "react";
import { Link, useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct, selectSingleProduct } from "./singleProductSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  console.log(productId);
  const singleProduct = useSelector(selectSingleProduct);
  const { id, name, description, imageUrl, price, inStock } = singleProduct;

  if (!singleProduct) {
    return <p>Oops! Product not found.</p>;
  }

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch]);

  return (
    <div id="single-product" className="column">
      <h1>{name}</h1>
      <h2>{description}</h2>
      <h3>{price}</h3>
      <p>ID Number: {id}</p>
      <p>Item in Stock: {inStock}</p>

      {description && description.length
        ? description
            .split("\n")
            .map((line, idx) => <p key={`product story key:${idx}`}>{line}</p>)
        : null}
      <h3>Image:</h3>
      <img src={imageUrl} />
    </div>
  );
};

export default SingleProduct;
