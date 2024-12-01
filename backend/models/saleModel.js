const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: String, required: true }, // Stored as YYYY-MM-DD
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
