const mongoose = require("mongoose");
const Book = require("./models/book");
const langs = require("langs")

mongoose.connect("mongodb+srv://under:construction@ucdatabase.f09kl.mongodb.net/UCdatabase?retryWrites=true&w=majority")
    .then(() => {
        console.log("connected successfully to UCdatabase")
    })
    .catch(e => {
        console.log("failed to connect to UCdatabase");
        console.log(e);
    })

async function getBooks() {
    let book = await Book.find()
    console.log(book)
}

async function getTop10() {
    const top10 = await Book.find({}).sort({ top: 1 }).limit(10)
    console.log(top10)
}

async function searchBooks(searchTerm, skip) {
    let data = await Book.find({ title: { "$regex": `${searchTerm}`, "$options": "i" } }).skip(skip).limit(5)
    console.log(data)
}

async function searchGenre(genresearch) {
    let data = await Book.find({ genre: { "$regex": `${genresearch}`, "$options": "i" } }).limit(5)
    console.log(data)
}

async function langC2N(){
    let langCodes = await Book.distinct("language_code")
    console.log(langCodes)
    let languages = []
    langCodes.forEach(code => {
        languages.push(langs.where("2",code).name)
    });
    console.log(languages)

}

langC2N()
// console.log(langs.codes("2B"))
