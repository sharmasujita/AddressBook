const mongoose = require("mongoose");


module.exports = mongoose.model("Contact", {
    name: {
        type: String,
        default: null,
        required: true,
    },
    phoneNumber: {
        type: Number,
        default: null,
        required: false,
    },
    email: {
        type: String,
        default: null,
        required: false,
    },
    address: {
        type: String,
        default: null,
        required: false,
    }
});

