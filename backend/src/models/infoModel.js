const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    // birthDate: {
    //     type: Date,
    //     required: true,
    // },
    age: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model("info", infoSchema)