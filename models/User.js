const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'file must be a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 6

    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    token: {
        type: String
    },
    avatar: {
        type: String,
        default: 'uploads/man.png'
    }

},
    { timestamps: true });

userSchema.pre('save', async (next) => {

    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

module.exports = mongoose.model('User', userSchema);
