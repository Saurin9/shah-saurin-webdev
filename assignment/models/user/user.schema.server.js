module.exports = function() {
    var mongoose = require("mongoose");

    // var WebsiteSchema = require("../website/website.schema.server")();

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteSchema'}],
        dateCreated: {type: Date, default: Date.now}
        // websites: [WebsiteSchema],
    }, {collection: "user"});
    return UserSchema;
};

/*
 var user = {
 username: 'alice',
 websites: [
 {_id: "123", name: 'facebook.com'},
 {_id: "234", name: 'twitter.com'}
 ]
 };
 */