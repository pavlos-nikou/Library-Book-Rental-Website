const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const Book = require("./models/book");
const Account = require("./models/account");
const langs = require("langs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { home } = require("nodemon/lib/utils");
const https = require("https");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

let signedIn = false;
let user = {
  _id: {
    $oid: "guestId",
  },
  name: "Guest",
  surname: "",
  email: "",
  password: "",
  cart: [
    "628752c997106114faf2a02a",
    "628752c997106114faf2a02a",
    "628752c997106114faf2a02a",
    "628752c997106114faf2a02a",
  ],
};

mongoose
  .connect(
    "mongodb+srv://under:construction@ucdatabase.f09kl.mongodb.net/UCdatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected successfully to UCdatabase");
  })
  .catch((e) => {
    console.log("failed to connect to UCdatabase");
    console.log(e);
  });

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "victoriassecret",
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req, res, next) => {
  console.log("middleware ran");
  if (req.session.user) {
    // console.log(req.session.user)
    // console.log("from middleware",req.session.user)
  } else {
    req.session.singedIn = false;
    req.session.user = {
      _id: {
        $oid: "guestId",
      },
      name: "Guest",
      surname: "",
      email: "",
      password: "",
      cart: [],
    };
  }
  console.log(req.session.user);
  next();
});

// validate if account exists and if the password is matching for the account that the user is trying to sign in as.
async function validate(AcEmail, AcPassword) {
  // console.log(AcEmail,AcPassword)
  let signInAccount = await Account.find({ email: AcEmail });

  if (signInAccount !== []) {
    if (signInAccount[0].password === AcPassword) {
      // console.log(signInAccount)
      return true, signInAccount[0];
    } else {
      console.log("false account credectials");
      return (
        false,
        {
          _id: {
            $oid: "guestId",
          },
          name: "Guest",
          surname: "",
          email: "",
          password: "",
          cart: [],
        }
      );
    }
  } else {
    console.log("an error has occured!!");
    return (
      false,
      {
        _id: {
          $oid: "guestId",
        },
        name: "Guest",
        surname: "",
        email: "",
        password: "",
        cart: [],
      }
    );
  }
}

// redirect to index (UnderConstruction) for no reason
app.get("/", (req, res) => {
  res.redirect("UnderConstruction");
});

// request for main page
app.get("/UnderConstruction", async (req, res) => {
  const data = await Book.find({}).sort({ top: 1 }).limit(10);
  console.log(
    "database access successfull. starting to render Underconstruction.ejs"
  );
  // console.log(data)
  // console.log(user)
  res.render("UnderConstruction", {
    data: data,
    signedIn: req.session.singedIn,
    account: req.session.user,
  });
});

// request for searching for a book
app.get("/UnderConstruction/searchProducts/s", async (req, res) => {
  let { searchTerm = " " } = req.query.search;
  console.log("searching....");
  // console.log(`searching for ${searchTerm}`)
  let searchResault = await Book.find({
    title: { $regex: `${searchTerm}`, $options: "i" },
  }).limit(10);
  let langCodes = await Book.distinct("language_code");
  let languages = [];
  langCodes.forEach((code) => {
    languages.push([code, langs.where("2", code).name]);
  });
  let genres = await Book.distinct("genre");
  let materials = await Book.distinct("material");
  // console.log(langCodes)
  console.log("database access successfull. starting to render Search.ejs");
  // console.log(searchResault)
  // console.log(searchResault.length)
  // console.log(user)
  res.render("Search", {
    searchResault: searchResault,
    languages: languages,
    genres: genres,
    materials: materials,
    signedIn: signedIn,
    account: user,
  });
});

// request for lazy loading
app.get(
  "/UnderConstruction/searchProducts/:type/:searchTerm/:skipAmmount",
  async (req, res) => {
    let searchTerm = req.params.searchTerm;
    let skipAmmount = req.params.skipAmmount;
    let typeOfSearch = req.params.type;
    // console.log(searchTerm, skipAmmount, typeOfSearch)
    let data = "";
    if (typeOfSearch === "s") {
      data = await Book.find({
        title: { $regex: `${searchTerm}`, $options: "i" },
      })
        .skip(skipAmmount)
        .limit(10);
    } else {
      if ((typeOfSearch = "g")) {
        data = await Book.find({
          genre: { $regex: `${searchTerm}`, $options: "i" },
        })
          .skip(skipAmmount)
          .limit(10);
      }
    }
    // console.log(data)
    // console.log(user)
    res.send(data);
  }
);

// request for genres
app.get("/UnderConstruction/searchProducts/g/:genre", async (req, res) => {
  let searchedGenre = req.params.genre;
  console.log(searchedGenre);
  let langCodes = await Book.distinct("language_code");
  let languages = [];
  langCodes.forEach((code) => {
    languages.push([code, langs.where("2", code).name]);
  });
  console.log(languages);
  let genres = await Book.distinct("genre");
  let materials = await Book.distinct("material");
  let searchResault = await Book.find({
    genre: searchedGenre,
    $options: "i",
  }).limit(10);
  // console.log(searchResault)
  // console.log(user)
  res.render("Search", {
    searchResault: searchResault,
    languages: languages,
    genres: genres,
    materials: materials,
    signedIn: signedIn,
    account: user,
  });
});

// validate Account
app.post("/UnderConstruction/signIn", async (req, res) => {
  let AcEmail = req.body.email;
  let AcPassword = req.body.pass;
  // console.log(AcPassword);
  let singedIn,
    signedInAccount = await validate(AcEmail, AcPassword);
  req.session.user = signedInAccount;
  // console.log(user)
  console.log(singedIn);
  res.redirect("/");
});

//request to load product
app.get("/UnderConstruction/searchProducts/:id", async (req, res) => {
  // console.log(req.session.user)
  let bookId = req.params.id;
  // console.log(bookId)
  let book = await Book.find({ _id: bookId });
  // console.log(book);
  let recommended = await Book.find({
    genre: book[0].genre,
    $options: "i",
  }).limit(5);
  // console.log(recommended);
  // res.send(bookdata)
  res.render("productPage", {
    book: book[0],
    recommended: recommended,
    signedIn: signedIn,
    account: user,
  });
});

// Create Account form
app.get("/UnderConstruction/SignUp", (req, res) => {
  res.render("SignUp");
});

app.post("/UnderConstruction/SignUp", (req, res) => {
  console.log(req.body);
  const user = new Account({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    country: req.body.country,
    zipCode: req.body.zipCode,
    city: req.body.city,
  });

  user
    .save()
    .then(() => {
      console.log("good");
      res.redirect("/");
    })
    .catch((err) => {
      console.dir(err);
      // res.send(err)
      res.render("SignUp", { err: err });
    });
});

//Checkout
app.get("/UnderConstruction/Checkout", async (req, res) => {
  cartdata = await Book.find({ _id: { $in: user.cart } });
  res.render("checkout", {
    signedIn: signedIn,
    account: user,
    cartdata: cartdata,
  });
});

//Newsletter
app.post("/UnderConstruction/newsletter", function(req, res){
  const email = req.body.email;
  console.log(email)
  const data = {
      members: [
          {
              email_address: email, 
              status:"subscribed",

          }
      ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/3a20ef6f09";

  const options = {
      method: "POST",
      auth: "alex1:612a1c658d167c046517fc44b3ac2e7b-us14"

  }
  const request = https.request(url, options, function(response){

      if(response.statusCode === 200) {
          res.render("success");
      } else {
          res.render("failure");
      }

      response.on("data", function(data){
          console.log(JSON.parse(data))
      })

  })

  request.write(jsonData);
  request.end();
});











app.listen(process.env.PORT || 3000, () => {
  console.log("listening");
});
