const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let orders = [];


app.post('/api/orders', (req, res) => {
    const { orderId, productName, dateOrdered, status, count } = req.body;

    if (!orderId || !productName || !dateOrdered || !status || typeof count !== 'number') {
        return res.status(400).json({ error: 'Missing or invalid order fields.' });
    }

    const newOrder = { orderId, productName, dateOrdered, status, count };
    orders.push(newOrder);

    res.status(201).json({ message: 'Order added successfully.', order: newOrder });
});


app.get('/api/orders', (req, res) => {
    res.json(orders);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Order Service API running on port ${PORT}`);
});