import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart/cartSlice";

const ProductCard = ({ item }) => {
    const dispatch = useDispatch()

    return (
        <div className="product-card">
            <div className="product-img">
                <img src={item.images} alt={item.title} />
            </div>

            <div className="product-content">
                <h3>{item.title}</h3>

                <div className="product-rating">
                    ⭐⭐⭐⭐⭐ <span>(120 Reviews)</span>
                </div>

                <div className="product-location">
                    📍 ShopNest Store
                </div>

                <div className="product-price">
                    <h4>${item.price}</h4>
                    <span className="discount">20% OFF</span>
                </div>

                <button className="add-cart-btn" onClick={() => dispatch(addToCart(item))}>
                    Add To Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;