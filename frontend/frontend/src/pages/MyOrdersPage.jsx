import React from "react";
import {
    useGetMyOrdersQuery,
} from "../redux/orders/orderApi";

const MyOrdersPage = () => {
    const {
        data,
        isLoading,
    } = useGetMyOrdersQuery();

    if (isLoading)
        return <h2>Loading...</h2>;

    return (
        <section className="myorders-page">
            <div className="myorders-container">

                <h2>
                    My Orders (
                    {data?.count || 0}
                    )
                </h2>

                {data?.orders?.map((order) => (
                    <div
                        className="order-card"
                        key={order._id}
                    >
                        <div className="order-top">
                            <h3>
                                Order #
                                {order._id.slice(-6)}
                            </h3>

                            <span>
                                $
                                {order.totalPrice}
                            </span>
                        </div>

                        {order.orderItems.map(
                            (item) => (
                                <div
                                    className="ordered-product"
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
                                        <h4>
                                            {item.title}
                                        </h4>

                                        <p>
                                            Qty:
                                            {
                                                item.quantity
                                            }
                                        </p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MyOrdersPage;