
// This app.js executes on the 'server' and has no relation with the 'app.js' in the 'public/assignment' directory of
// which executes on the 'client'. The name 'app.js' is commonly used. So same name.
// Even though both are written in JavaScript, they execute under different environments/frameworks.

module.exports = function (app) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:userId", deleteUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];


    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password){
            findUserByCredentials(req, res);
        }
        else if(username){
            findUserByUsername(req, res);
        }
        // else {
        //     createUser(req, res);
        // }
    }

    function createUser(req, res) {
        var newUser = req.body;
        console.log(newUser);
        var user_new = {_id: (new Date()).getTime().toString(),
            username: newUser.username,
            password: newUser.password,
        };
        users.push(user_new);
        res.json(user_new);

    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        for(var u in users){
            var user = users[u];
            if(user.username === username) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);                          //.send({message: 'User Not Found !'});
    }

    function findUserByCredentials (req, res) {         // the 'app' instance of Express has 'req' and 'res' objects
        var username = req.query['username'];
        var password = req.query['password'];
        var user = users.find(function (user) {
            return user.username == username && user.password == password;        // this line returns a user 'object',
            // and not a 'Boolean'
        });
        console.log(user);
        res.json(user);                 // OR you can write 'res.send(user)' which takes care of all types of data
    }

    function findUserByUserId(req, res) {
        var userId = req.params['userId'];
        for(var u in users){
            var user = users[u];
            if(user._id === userId) {
                //return angular.copy(user);           // as earlier client-side written code
                res.json(user);                // OR you can write 'res.send(user)' which takes care of all types of data
                return;
            }
        }
        // return null;                                // as earlier client-side written code
        res.sendStatus(404).send({});
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser = req.body;
        for(var u in users){
            var user = users[u];
            if(user._id === userId ) {
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                res.json(user);
                return;
            }
        }
        // return null;
    }

    function deleteUser(req,res) {
        var userId = req.params['userId'];
        for (var u in users){
            var user = users[u];
            if(user._id === userId){
                res.json(user);
                users.splice(u,1);
                return;
            }
        }
    }
};