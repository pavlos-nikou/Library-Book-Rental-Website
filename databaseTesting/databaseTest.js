const assert = require("assert");
const funcs = require("./testfunctions");
const mongoose = require("mongoose");
const Book = require("./models/book");
const langs = require("langs");
const Account = require("./models/account");
const bcrypt = require("bcrypt");


before((done) => {
    mongoose.connect("mongodb+srv://under:construction@ucdatabase.f09kl.mongodb.net/UCdatabase?retryWrites=true&w=majority")
        .then(() => {
            console.log("Conected to database!")
            done()
        })
        .catch(e => {
            console.log("failed to connect ot database");
            done(e)
        });
});

describe("Books", () => {
    it("searching for Harry Potter and the Order of the Phoenix", function (done) {
        this.timeout(0);
        funcs.getBooks("Harry Potter and the Order of the Phoenix")
            .then(data => {
                assert.equal(data[0].title, "Harry Potter and the Order of the Phoenix")
                done()
            })
            .catch(e => {
                done(e)
            })
    })
    it("get top 10 books from database", function (done) {
        this.timeout(0);
        funcs.getTop10()
            .then(data => {
                let bookTitles = []
                data.forEach(book => {
                    bookTitles.push(book.title)
                })
                assert.deepEqual(bookTitles, [
                    "Harry Potter and the Half-Blood Prince"
                    , "Harry Potter and the Order of the Phoenix"
                    , "Harry Potter and the Philosopher's Stone"
                    , "Harry Potter and the Prisoner of Azkaban"
                    , "Harry Potter and the Goblet of Fire"
                    , "Harry Potter Collection (Harry Potter, #1-6)"
                    , "The Hitchhiker's Guide to the Galaxy"
                    , "The Ultimate Hitchhiker's Guide: Five Complete Novels and One Story"
                    , "A Short History of Nearly Everything"
                    , "Down Under"
                ])
                done()
            })
            .catch(e => {
                done(e)
            })
    })
    it("search and return the first 5 books of a specific genre", function (done) {
        this.timeout(0)
        funcs.searchGenre("Fantacy")
            .then(data => {
                let bookTitles = []
                data.forEach(book => {
                    bookTitles.push(book.title)
                })
                assert.deepEqual(bookTitles, [
                    "Harry Potter and the Philosopher's Stone",
                    'A Short History of Nearly Everything',
                    'Neither Here Nor There: Travels in Europe',
                    'The Hobbit and The Lord of the Rings',
                    'The Lord of the Rings'
                ])
                done()
            })
            .catch(e => {
                done(e)
            })
    })
})

describe("usefull functions for filtering searched books", () => {
    it("convert language codes(eng,spa) to the names of each language", function () {
        this.timeout(0)
        data = funcs.langC2N()
        assert.deepEqual(data, ['English', 'Spanish'])
    })
    it("get all genres", function (done) {
        this.timeout(0)
        funcs.getAllGenres()
            .then(data => {
                assert.deepEqual(data,
                    ['Fantacy',
                        'Mystery',
                        'Romance',
                        'Thriller',
                        'Westerns',
                        'dystopian',
                        'sci-fi',
                        'self-improvement'
                    ])
                done()
            })
            .catch(e => {
                done(e)
            })
    })
    it("get all materials", function (done) {
        this.timeout(0)
        funcs.getAllMaterials()
            .then(data => {
                assert.deepEqual(data, ["hard", "soft"])
                done()
            })
            .catch(e => {
                done(e)
            })
    })
})

describe("Acounts", () => {
    it("create new dummy user", function (done) {
        this.timeout(0)
        user = funcs.createAccount()
        user.save()
            .then(() => {
                assert(!user.isNew);
                done();
            })
            .catch(e => {
                done(e)
            })
    })
    it("compare passwords (input password with hashed varsion)", function (done) {
        bcrypt.hash("1234", 5, function (err, hash) {
            funcs.comparePassword("1234", hash)
                .then(data => {
                    assert.equal(data, true)
                    done()
                })
                .catch(e => {
                    done(e)
                })
        })
    })
    after("delete the new dummy user that was created", function(done) {
        Account.findOneAndRemove({ username: "dummy" })
            .then(()=>{
                done()
            })
            .catch(e => {
                done(e)
            })
    })
})
