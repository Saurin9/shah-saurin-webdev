module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var Q = require("q");

    var api = {
        setModel: setModel,
        createWebsite: createWebsite,
        findWebsitesByUser: findWebsitesByUser,
        // findWebsiteById: findWebsiteById,
        // deleteWebsite: deleteWebsite,
        // updateWebsite: updateWebsite
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function findWebsitesByUser(userId) {
        return model.userModel.findWebsitesForUser(userId);
    }

    function createWebsite(userId, website) {
        return WebsiteModel
            .create(website)
            .then(function(websiteObj){
                model.userModel
                    .findUserById(userId)
                    .then(function(userObj){
                        websiteObj._user = userObj._id;
                        websiteObj.save();
                        userObj.websites.push(websiteObj);
                        return userObj.save();
                    }, function(error){
                        console.log(error);
                    });
            });
    }

    // function findWebsiteById () {
    //
    // }

    //
    // function deleteWebsite() {
    //
    // }

    // function updateWebsite() {
    //
    // }
};