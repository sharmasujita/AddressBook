const mongoose = require("mongoose");


module.exports = mongoose.model("addressBook", {
    id: {
        type: Number,
        default: null,
        required: true,
        unique: true    
    },
    name: {
        type: String,
        default: null,
        required: true,
    },
    phoneNumber: {
        type: Number,
        default: null,
        required: true,
    },
    email: {
        type: String,
        default: null,
        required: true,
    },
    address: {
        type: String,
        default: null,
        required: true,
    }
});

