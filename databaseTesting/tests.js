const Book = require("./models/book");
const langs = require("langs");
const Account = require("./models/account");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")

// search for book
async function getBooks(searchTerm) {
    let data = await Book.find({ title: { "$regex": `${searchTerm}`, "$options": "i" } }).limit(5)
    return data;
}
// get top 10 books from database
async function getTop10() {
    const top10 = await Book.find({}).sort({ top: 1 }).limit(10)
    return top10;
}
// search for books from a specific genre
async function searchGenre(genresearch) {
    let data = await Book.find({ genre: { "$regex": `${genresearch}`, "$options": "i" } }).limit(5)
    return data;
}

// convert language code to language name
function langC2N() {
    langCodes = ["eng", "spa"]
    let languages = []
    langCodes.forEach(code => {
        languages.push(langs.where("2", code).name)
    });
    return languages;

}
// create new account
function createAccount() {
    const user = new Account({
        username: "dummy",
        email: "dummyAccount@DummyEmail.com",
        password: "password",
        password2: "password2",
        firstName: "dummy",
        lastName: "Account",
        address: "someaddress",
        country: "country",
        zipCode: "zipcode",
        city: "city",
    });
    return user
}
// check if input password is the correct hashed password
async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

async function getAllGenres() {
    return await Book.distinct("genre")
}

async function getAllMaterials() {
    return await Book.distinct("material")
}

module.exports = {
    getBooks: getBooks,
    getTop10: getTop10,
    searchGenre: searchGenre,
    langC2N: langC2N,
    comparePassword: comparePassword,
    getAllGenres: getAllGenres,
    getAllMaterials: getAllMaterials,
    createAccount: createAccount
}