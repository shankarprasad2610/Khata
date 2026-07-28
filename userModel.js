const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        customers: {
            type: Array,
            default: []
        },
        vendors: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }   // adds createdAt and updatedAt automatically
);

module.exports = mongoose.model("User", userSchema);