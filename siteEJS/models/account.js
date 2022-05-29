const mongoose = require("mongoose");

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const accountSchema = mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required: true
    },
    surname:{
        type: String,
        trim: true,
        required: true
    },
    password:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
})

const Account  =mongoose.model("Account", accountSchema);

module.exports = Account