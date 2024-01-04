const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const AudioSchema = new Schema({
    link: String,
    name: String,

}, {_id: false} ) 
const WordSchema = new Schema({
    word: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    audio: {
        type: AudioSchema,
        required: true
    }
}, {timestamps: true})

module.exports = module.exports = mongoose.model("words", WordSchema);