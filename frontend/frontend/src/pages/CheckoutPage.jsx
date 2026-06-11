import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { clearCart } from "../redux/cart/cartSlice";

import {
    useCreateOrderMutation,
} from "../redux/orders/orderApi";
const CheckoutPage = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [createOrder] =
        useCreateOrderMutation();
    const { cart } = useSelector((state) => state.cart);

    const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const shipping = subtotal > 0 ? 10 : 0;
    const gst = Number((subtotal * 0.18).toFixed(2));
    const total = subtotal + shipping + gst;

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        country: "Pakistan",
        address: "",
        city: "",
        state: "",
        phone: "",
        email: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const orderData = {
                orderItems: cart.map((item) => ({
                    product: item._id,

                    title: item.title,

                    image:
                        item.images?.[0] ||
                        item.images,

                    quantity: item.quantity,

                    price: item.price,
                })),

                shippingAddress: {
                    fullName: `${formData.firstName} ${formData.lastName}`,

                    phone: formData.phone,

                    address: formData.address,

                    city: formData.city,

                    country: formData.country,
                },

                totalPrice: total,

                paymentMethod: "Cash On Delivery",
            };

            console.log(orderData);

            await createOrder(orderData).unwrap();

            alert("Order Placed Successfully");

            dispatch(clearCart());

            navigate("/pages/myorders");

        } catch (error) {
            console.log(error);

            alert(
                error?.data?.message ||
                "Order Failed"
            );
        }
    };

    return (
        <section className="checkout-page">

            <div className="checkout-container">

                {/* LEFT */}

                <div className="checkout-left">

                    <h2>Billing Details</h2>

                    <form
                        className="checkout-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="double-input">

                            <div>
                                <label>First Name</label>

                                <input
                                    type="text"
                                    name="firstName"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label>Last Name</label>

                                <input
                                    type="text"
                                    name="lastName"
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <label>Country</label>

                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />

                        <label>Address</label>

                        <input
                            type="text"
                            name="address"
                            onChange={handleChange}
                        />

                        <label>City</label>

                        <input
                            type="text"
                            name="city"
                            onChange={handleChange}
                        />

                        <label>State</label>

                        <input
                            type="text"
                            name="state"
                            onChange={handleChange}
                        />

                        <label>Phone</label>

                        <input
                            type="text"
                            name="phone"
                            onChange={handleChange}
                        />

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                        />

                    </form>

                </div>

                {/* RIGHT */}

                <div className="checkout-right">

                    <h2>Order Details</h2>

                    <div className="order-box">

                        {cart.map((item) => (

                            <div
                                className="order-product"
                                key={item._id}
                            >

                                <img
                                    src={
                                        item.images?.[0] ||
                                        item.images
                                    }
                                    alt={item.title}
                                />

                                <div>
                                    <h4>{item.title}</h4>

                                    <span>
                                        Qty: {item.quantity}
                                    </span>
                                </div>

                                <strong>
                                    $
                                    {(
                                        item.price *
                                        item.quantity
                                    ).toFixed(2)}
                                </strong>

                            </div>

                        ))}

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>
                                ${shipping.toFixed(2)}
                            </span>
                        </div>

                        <div className="summary-row">
                            <span>GST</span>
                            <span>
                                ${gst.toFixed(2)}
                            </span>
                        </div>

                        <div className="summary-row total-row">
                            <span>Total</span>
                            <span>
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        <div className="payment-method">

                            <label>
                                <input
                                    type="radio"
                                    defaultChecked
                                />
                                Cash On Delivery
                            </label>

                            <label>
                                <input type="radio" />
                                Bank Transfer
                            </label>

                        </div>

                        <button
                            className="place-order-btn"
                            onClick={handleSubmit}
                        >
                            Place Order
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default CheckoutPage;