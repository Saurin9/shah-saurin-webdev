
// This app.js executes on the 'server' and has no relation with the 'app.js' in the 'public/assignment' directory of
// which executes on the 'client'. The name 'app.js' is commonly used. So same name.
// Even though both are written in JavaScript, they execute under different environments/frameworks.

module.exports = function (app, model) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:userId", deleteUser);

    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];


    // chooses to call either 'findUserByCredentials' or 'findUserByUsername' :
    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password){
            findUserByCredentials(req, res);
        }
        else if(username){
            findUserByUsername(req, res);
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        //console.log(newUser);
        model
            .userModel
            .createUser(newUser)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
        // var user_new = {_id: (new Date()).getTime().toString(),
        //     username: newUser.username,
        //     password: newUser.password,
        // };
        // users.push(user_new);
        // res.json(user_new);

    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                    res.json(user);
                }else{
                        res.sendStatus(400);
                }},
                function (err) {
                    res.sendStatus(400);
                }
            );
        // for(var u in users){
        //     var user = users[u];
        //     if(user.username === username) {
        //         res.json(user);
        //         return;
        //     }
        // }
        // res.sendStatus(404);                          //.send({message: 'User Not Found !'});
    }

    function findUserByCredentials (req, res) {         // the 'app' instance of Express has 'req' and 'res' objects
        var username = req.query['username'];
        var password = req.query['password'];
        model
            .userModel
            .findUserByCredentials(username,password)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
        // var user = users.find(function (user) {
        //     return user.username == username && user.password == password;        // this line returns a user 'object',
        //     // and not a 'Boolean'
        // });
        // console.log(user);
        // res.json(user);                 // OR you can write 'res.send(user)' which takes care of all types of data
    }

    function findUserByUserId(req, res) {
        var userId = req.params['userId'];
        model
            .userModel
            .findUserByUserId(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );

        // for(var u in users){
        //     var user = users[u];
        //     if(user._id === userId) {
        //         //return angular.copy(user);           // as earlier client-side written code
        //         res.json(user);                // OR you can write 'res.send(user)' which takes care of all types of data
        //         return;
        //     }
        // }
        // // return null;                                // as earlier client-side written code
        // res.sendStatus(404).send({});
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser = req.body;
        model
            .userModel
            .updateUser(userId,newUser)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
        //
        // for(var u in users){
        //     var user = users[u];
        //     if(user._id === userId ) {
        //         users[u].firstName = newUser.firstName;
        //         users[u].lastName = newUser.lastName;
        //         res.json(user);
        //         return;
        //     }
        // }
        // // return null;
    }

    function deleteUser(req,res) {
        var userId = req.params['userId'];

        model
            .userModel
            .findUserByUserId(userId)
            .then(
                function (user) {
                    var websites = [];
                    for (var i = 0 ; i < user.websites.length ; i++) {
                        websites.push(user.websites[i]);
                    }
                    for(var w in websites) {
                        model
                            .websiteModel
                            .findWebsiteById(websites[w])
                            .then(
                                function (website) {
                                    model
                                        .pageModel
                                        .removeAllPagesForWebsite(website.pages)
                                        .then(
                                            function () {
                                                model
                                                    .userModel
                                                    .removeWebsiteFromUser(website._id, website._user[0])
                                                    .then(
                                                        function () {
                                                            console.log(website._id);
                                                            model
                                                                .websiteModel
                                                                .deleteWebsite(website._id)
                                                                .then(
                                                                    function (website) {
                                                                        // res.json(website);
                                                                    },
                                                                    function (err) {
                                                                        res.sendStatus(400).send(err);
                                                                    }
                                                                );
                                                        },
                                                        function (err) {
                                                            res.sendStatus(400).send(err);
                                                        }
                                                    );
                                            },
                                            function (err) {
                                                res.sendStatus(400).send(err);
                                            }
                                        );
                                },
                                function (err) {
                                    res.sendStatus(400).send(err);
                                });
                    }
                    model
                        .userModel
                        .deleteUser(userId)
                        .then(
                            function (newUser) {
                                res.send(newUser);
                            },
                            function (err) {
                                res.sendStatus(400).send(err);
                            }
                        );
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );

        // model
        //     .userModel
        //     .deleteUser(userId)
        //     .then(
        //         function (user) {
        //             res.json(user);
        //         },
        //         function (err) {
        //             res.sendStatus(400);
        //         }
        //     );
        // for (var u in users){
        //     var user = users[u];
        //     if(user._id === userId){
        //         res.json(user);
        //         users.splice(u,1);
        //         return;
        //     }
        // }
    }
};