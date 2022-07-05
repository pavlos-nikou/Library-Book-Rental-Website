const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    top: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        unique: true,
        required: true
    },
    authors: {
        type: String,
        required: true
    },
    release: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    language_code: {
        type: String,
        required: true
    },
    average_rating: {
        type: Number,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    small_image_url: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    genre:{
        type:String,
        required:true
    }
});

const Book = mongoose.model("Book", bookSchema);


module.exports = Book;