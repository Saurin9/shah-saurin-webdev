module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel  = mongoose.model("UserModel", UserSchema);

    var Q = require("q");

    var api = {
        createUser: createUser,
        findUserByUserId: findUserByUserId,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        //findWebsitesForUser: findWebsitesForUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }
    
    function findUserByUsername(username) {
        var deferred = Q.defer();
        UserModel
            .findOne({"username":username}, function (err, user) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    // function findUserByGoogleId(googleId) {
    //     return UserModel
    //         .findOne({"google.id": googleId});
    // }

    // function findWebsitesForUser(userId) {
    //     return UserModel
    //         .findById(userId)
    //         .populate("websites", "name")
    //         .exec();
    // }

    function deleteUser(userId) {
        var deferred = Q.defer();
        UserModel
            .remove({"_id":userId}, function (err, user) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = Q.defer();
        UserModel
            .findOne({"username":username, "password":password}, function (err, user) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = Q.defer();
        UserModel
            .update({"_id":userId}, {firstName: user.firstName, lastName: user.lastName}, function (err, user) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByUserId(userId) {
        var deferred = Q.defer();
        UserModel
            .findOne({"_id":userId}, function (err, user) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = Q.defer();
        UserModel
            .create(user, function (err, user) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
};