const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const Book = require("./models/book");
const Account = require("./models/account")
const langs = require("langs")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, "/public")))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let signedIn = false;
let user = {
    "_id": {
        "$oid": "guestId"
    },
    "name": "Guest",
    "surname": "",
    "email": "",
    "password": "",
    cart: []
}

mongoose.connect("mongodb+srv://under:construction@ucdatabase.f09kl.mongodb.net/UCdatabase?retryWrites=true&w=majority")
    .then(() => {
        console.log("connected successfully to UCdatabase")
    })
    .catch(e => {
        console.log("failed to connect to UCdatabase");
        console.log(e);
    })
// validate if account exists and if the password is matching for the account that the user is trying to sign in as.
async function validate(AcEmail, AcPassword) {
    // console.log(AcEmail,AcPassword)
    let signInAccount = await Account.find({ email: AcEmail })

    if (signInAccount !== []) {
        if (signInAccount[0].password === AcPassword) {
            // console.log(signInAccount)
            return true, signInAccount[0]
        }
        else {
            console.log("false account credectials")
            return false, "false credentials!!!"
        }
    }
    else {
        console.log('an error has occured!!')
        return false, 'an error has occured!!';
    }
}
// redirect to index (UnderConstruction) for no reason 
app.get("/", (req, res) => {
    res.redirect("UnderConstruction")
})

// request for main page
app.get("/UnderConstruction", async (req, res) => {
    const data = await Book.find({}).sort({ top: 1 }).limit(10)
    console.log("database access successfull. starting to render Underconstruction.ejs")
    // console.log(data)
    // console.log(user)
    res.render("UnderConstruction", { data: data, signedIn: signedIn, account: user })
})


// request for searching for a book
app.get("/UnderConstruction/searchProducts/s", async (req, res) => {
    let searchTerm = req.query.search
    console.log("searching....")
    // console.log(`searching for ${searchTerm}`)
    let searchResault = await Book.find({ title: { "$regex": `${searchTerm}`, "$options": "i" } }).limit(10)
    let langCodes = await Book.distinct("language_code")
    let languages = []
    langCodes.forEach(code => {
        languages.push([code, langs.where("2", code).name])
    });
    let genres = await Book.distinct("genre")
    let materials = await Book.distinct("material")
    // console.log(langCodes)
    console.log("database access successfull. starting to render Search.ejs")
    // console.log(searchResault)
    // console.log(searchResault.length)
    // console.log(user)
    res.render("Search", { searchResault: searchResault, languages: languages, genres: genres, materials: materials, signedIn: signedIn, account: user })
})


// request for lazy loading
app.get("/UnderConstruction/searchProducts/:type/:searchTerm/:skipAmmount", async (req, res) => {
    let searchTerm = req.params.searchTerm
    let skipAmmount = req.params.skipAmmount
    let typeOfSearch = req.params.type
    // console.log(searchTerm, skipAmmount, typeOfSearch)
    let data = ""
    if (typeOfSearch === "s") {
        data = await Book.find({ title: { "$regex": `${searchTerm}`, "$options": "i" } }).skip(skipAmmount).limit(10)
    }
    else {
        if (typeOfSearch = "g") {
            data = await Book.find({ genre: { "$regex": `${searchTerm}`, "$options": "i" } }).skip(skipAmmount).limit(10)
        }
    }
    // console.log(data)
    // console.log(user)
    res.send(data)
})

// request for genres
app.get("/UnderConstruction/searchProducts/g/:genre", async (req, res) => {
    let searchedGenre = req.params.genre
    console.log(searchedGenre)
    let langCodes = await Book.distinct("language_code")
    let languages = []
    langCodes.forEach(code => {
        languages.push([code, langs.where("2", code).name])
    });
    console.log(languages)
    let genres = await Book.distinct("genre")
    let materials = await Book.distinct("material")
    let searchResault = await Book.find({ genre: searchedGenre, "$options": "i" }).limit(10)
    // console.log(searchResault)
    // console.log(user)
    res.render("Search", { searchResault: searchResault, languages: languages, genres: genres, materials: materials, signedIn: signedIn, account: user })
})

// validate Account
app.post("/UnderConstruction/signIn", async (req, res) => {
    let AcEmail = req.body.email
    let AcPassword = req.body.pass
    // console.log(AcPassword);
    let signedInAccount = await validate(AcEmail, AcPassword)
    user = signedInAccount
    // console.log(user)
    res.send(signedInAccount)
})

//request to load product
app.get("/UnderConstruction/searchProducts/:id", async (req, res) => {
    console.log("product")
    let bookId = req.params.id
    console.log(bookId)
    let book = await Book.find({ "_id": bookId })
    console.log(book);
    let recommended = await Book.find({ genre: book[0].genre, "$options": "i" }).limit(5)
    console.log(recommended);
    // res.send(bookdata)
    res.render("productPage", { book: book[0], recommended: recommended, signedIn: signedIn, account: user })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("listening")
})