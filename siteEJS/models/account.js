const mongoose = require("mongoose");

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const accountSchema = mongoose.Schema({
    username:{
        type: String,
        trim: true,
        require: true
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        trim: true,
        required: true
    },
    firstName:{
        type:String,
        trim: true,
        required: true
    },
    lastName:{
        type: String,
        trim: true,
        required: true
    },
    address:{
        type: String,
        trim: true,
        required: false
    },
    country:{
        type: String,
        trim: true,
        require: true
    },
    zipCode:{
        type: String,
        trim: true,
        require: false
    },
    city:{
        type: String,
        trim: true,
        require: false
    }
})

const Account  =mongoose.model("Account", accountSchema);

module.exports = Account