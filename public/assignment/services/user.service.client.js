(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService($http) {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            "findUserByCredentials": findUserByCredentials,     // Maps the name of the function name by which it is known
                                                                // outside to what it is known here (out:here). Both may be
                                                                // different. But 'here' should be same as what is defined
                                                                // inside this file
            "findUserById": findUserById,
            "updateUser": updateUser,
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "deleteUser": deleteUser
        };
        return api;
        
        function createUser(user) {
            return $http.post("/api/user", user);
            //  var user_new = {_id: (new Date()).getTime().toString(),
            //     username: user.username,
            //     password: user.password,
            //     firstname: user.firstName,
            //     lastname: user.lastName};
            // users.push(user_new);
            // return angular.copy(user_new);
        }

        function findUserByUsername(username){
            return $http.get("/api/user/?username=" + username);
            // for(var u in users){
            //     var user = users[u];
            //     if(user.username === username){
            //         return 1;
            //     }
            // }
            // return 0;
        }
        
        function deleteUser(userId) {
            return $http.delete("/api/user/" + userId);
            // for (var u in users){
            //     var user = users[u];
            //     if(user._id === userId){
            //         users.splice(u,1);
            //     }
            // }
        }

        function findUserById(uid) {
            return $http.get("/api/user/" + uid);
            // for(var u in users){
            //     var user = users[u];
            //     if(user._id === uid) {
            //         return angular.copy(user);
            //     }
            // }
            // return null;
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password);
            // *** IMP ***
            // Refer this file, 'user.service' and 'login.controller' to understand the following explanation concept.
            // This will return a object immediately, not the one returned by the server using '$http.get'. It promises
            // that it will return the server response which it might take time. This is given to the browser to handle.
            // We register for a successful callback from the server. So we write a promise.success() function which
            // the browser will call when it successfully gets the server response.
            // The response of the server is a JSON object, which is a user. So that object is passed to the
            // function in promise.function() as user (any name would work here)

            // for(var u in users){
            //     var user = users[u];
            //     if(user.username === username &&
            //         user.password === password){
            //         return angular.copy(user);
            //     }
            // }
            // return null;
        }
        
        function updateUser(userId, newUser) {
            return $http.put("/api/user/" + userId, newUser);
            // for(var u in users){
            //     var user = users[u];
            //     if(user._id === userId ) {
            //         users[u].firstName = newUser.firstName;
            //         users[u].lastName = newUser.lastName;
            //         return user;
            //     }
            // }
            // return null;
        }

    }
})();