import React, { useState } from "react";
import '../styles/Order.css'; 

const products = [
    { id: 1, name: "Jasmine Rice 1kg Bag" },
    { id: 2, name: "Basmati Rice 1kg Bag" },
    { id: 3, name: "Brown Rice 1kg Bag" },
];

function getCurrentDate() {
    const now = new Date();
    return now.toISOString().split("T")[0];
}

export default function Order() {
    const [selectedProduct, setSelectedProduct] = useState(products[0].id);
    const [quantity, setQuantity] = useState(1);
    const [orders, setOrders] = useState([]);

    const handleOrder = () => {
        const product = products.find((p) => p.id === Number(selectedProduct));
        setOrders([
            ...orders,
            {
                id: Date.now(),
                name: product.name,
                date: getCurrentDate(),
                status: "Pending",
                count: quantity,
            },
        ]);
    };

    // Calculate total count
    const totalCount = orders.reduce((sum, order) => sum + Number(order.count), 0);

    return (
        <div className="order-container">
            <h2>Place Your Order</h2>
            <div className="order-form-group">
                <label>
                    Product:
                    <select
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="order-form-group">
                <label>
                    Quantity:
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </label>
            </div>
            <button className="order-btn" onClick={handleOrder}>Order</button>

            <h3 style={{ marginTop: 32 }}>Your Orders</h3>
            {orders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                <div className="order-table-wrapper">
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.name}</td>
                                    <td>{order.date}</td>
                                    <td>{order.status}</td>
                                    <td>{order.count}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3">Total</td>
                                <td>{totalCount}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}
        </div>
    );
}