const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    quiz_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    items: [{
        word: {
            type: String,
            required: true,
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model("quiz", quizSchema);