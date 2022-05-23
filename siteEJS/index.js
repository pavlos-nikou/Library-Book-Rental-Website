const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const Book = require("./models/book");
const langs = require("langs")
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, "/public")))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect("mongodb+srv://under:construction@ucdatabase.f09kl.mongodb.net/UCdatabase?retryWrites=true&w=majority")
    .then(() => {
        console.log("connected successfully to UCdatabase")
    })
    .catch(e => {
        console.log("failed to connect to UCdatabase");
        console.log(e);
    })


// redirect to index (UnderConstruction) for no reason 
app.get("/", (req, res) => {
    res.redirect("UnderConstruction")
})

// request for main page
app.get("/UnderConstruction", async (req, res) => {
    const data = await Book.find({}).sort({ top: 1 }).limit(10)
    console.log("database access successfull. starting to render Underconstruction.ejs")
    // console.log(data)
    res.render("UnderConstruction", { data: data })
})


// request for searching for a book
app.get("/UnderConstruction/searchproducts", async (req, res) => {
    let searchTerm = req.query.search
    console.log("searching....")
    // console.log(`searching for ${searchTerm}`)
    let searchResault = await Book.find({ title: { "$regex": `${searchTerm}`, "$options": "i" } }).limit(10)
    let langCodes = await Book.distinct("language_code")
    let languages = []
    langCodes.forEach(code => {
        languages.push([code,langs.where("2", code).name])
    });
    let genres = await Book.distinct("genre")
    let materials = await Book.distinct("material")
    // console.log(langCodes)
    console.log("database access successfull. starting to render Search.ejs")
    // console.log(searchResault)
    // console.log(searchResault.length)
    res.render("Search", { searchResault: searchResault, languages: languages, genres: genres, materials: materials })
})


// request for lazy loading
app.get("/UnderConstruction/searchproducts/:searchTerm/:skipAmmount", async (req, res) => {
    let searchTerm = req.params.searchTerm
    let skipAmmount = req.params.skipAmmount
    console.log(searchTerm, skipAmmount)
    let data = await Book.find({ title: { "$regex": `${searchTerm}`, "$options": "i" } }).skip(skipAmmount).limit(10)
    // console.log(data)
    res.send(data)
})

// request for genres
app.get("/UnderConstruction/searchproducts/:genre", async (req, res) => {
    let searchedGenre = req.params.genre
    console.log(searchedGenre)
    let langCodes = await Book.distinct("language_code")
    let languages = []
    langCodes.forEach(code => {
        languages.push(code,langs.where("2", code).name)
    });
    let genres = await Book.distinct("genre")
    let materials = await Book.distinct("material")
    let searchResault = await Book.find({ genre: searchedGenre, "$options": "i" }).limit(10)
    // console.log(searchResault)
    res.render("Search", { searchResault: searchResault, languages: languages, genres: genres, materials: materials })
})

// app.get("/UnderConstruction/searchproducts/:id",(req,res)=>{
//     console.log(req.params)
// })

// app.post("/UnderConstruction/searchproducts/:id",(req,res)=>{
//     res.render(req.body)
// })

app.listen(3000, () => {
    console.log("listening")
})