const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/ordersdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});


const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    productName: { type: String, required: true },
    dateOrdered: { type: String, required: true },
    status: { type: String, required: true },
    count: { type: Number, required: true }
});

const Order = mongoose.model('Order', orderSchema);

// POST: Add a new order
app.post('/api/orders', async (req, res) => {
    const { orderId, productName, dateOrdered, status, count } = req.body;

    if (!orderId || !productName || !dateOrdered || !status || typeof count !== 'number') {
        return res.status(400).json({ error: 'Missing or invalid order fields.' });
    }

    try {
        const newOrder = new Order({ orderId, productName, dateOrdered, status, count });
        await newOrder.save();
        res.status(201).json({ message: 'Order added successfully.', order: newOrder });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add order.' });
    }
});

// GET: Fetch all orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Order Service API running on port ${PORT}`);
});