import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
} from "../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cart } = useSelector((state) => state.cart);

    const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const shipping = subtotal > 0 ? 10 : 0;
    const gst = Number((subtotal * 0.18).toFixed(2));
    const total = subtotal + shipping + gst;

    return (
        <section className="cart-page">
            <div className="cart-container">

                <div className="cart-left">

                    <div className="cart-heading">
                        <span>Product</span>
                        <span>Price</span>
                        <span>Quantity</span>
                        <span>Subtotal</span>
                    </div>

                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <h2>Your Cart Is Empty</h2>
                            <p>Start shopping and add products to cart.</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div className="cart-item" key={item._id}>
                                <div className="cart-product">

                                    <div className="cart-image">
                                        <img
                                            src={item.images?.[0] || item.image}
                                            alt={item.title}
                                        />

                                        <button
                                            className="remove-btn"
                                            onClick={() => dispatch(removeFromCart(item._id))}
                                        >
                                            ×
                                        </button>
                                    </div>

                                    <div className="cart-info">
                                        <h4>{item.title}</h4>
                                        <p>{item.category}</p>
                                    </div>
                                </div>

                                <div className="cart-price">
                                    ${item.price}
                                </div>

                                <div className="cart-qty">
                                    <button
                                        onClick={() =>
                                            dispatch(decreaseQuantity(item._id))
                                        }
                                    >
                                        -
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        onClick={() =>
                                            dispatch(increaseQuantity(item._id))
                                        }
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="cart-subtotal">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))
                    )}

                    {cart.length > 0 && (
                        <div className="cart-actions">
                            <button
                                className="continue-btn"
                                onClick={() => navigate("/")}
                            >
                                Continue Shopping
                            </button>

                            <button
                                className="clear-btn"
                                onClick={() => dispatch(clearCart())}
                            >
                                Clear Cart
                            </button>
                        </div>
                    )}
                </div>

                <div className="cart-summary">

                    <h3>Order Summary</h3>

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span>GST (18%)</span>
                        <span>${gst.toFixed(2)}</span>
                    </div>

                    <div className="summary-row total-row">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <button
                        className="checkout-btn"
                        onClick={() => navigate("/pages/checkoutpage")}
                    >
                        Proceed To Checkout
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CartPage;