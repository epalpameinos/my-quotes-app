
const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    isOrange: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Quote', QuoteSchema);