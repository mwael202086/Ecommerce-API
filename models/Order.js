const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number
        },
        price: {
            type: Number
        }
    }],

    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'SHIPPED', 'DELIVERED'],
        default: 'PENDING'
    },
})

module.exports = mongoose.model('Order', orderSchema);