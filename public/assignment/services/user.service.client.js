(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService() {
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
             var user_new = {_id: (new Date()).getTime().toString(),
                username: user.username,
                password: user.password,
                firstname: user.firstName,
                lastname: user.lastName};
            users.push(user_new);
            return angular.copy(user_new);
        }

        function findUserByUsername(username){
            for(var u in users){
                var user = users[u];
                if(user.username === username){
                    return 1;
                }
            }
            return 0;
        }
        
        function deleteUser(userId) {
            for (var u in users){
                var user = users[u];
                if(user._id === userId){
                    users.splice(u,1);
                }
            }
        }

        function findUserById(uid) {
            for(var u in users){
                var user = users[u];
                if(user._id === uid) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users){
                var user = users[u];
                if(user.username === username &&
                    user.password === password){
                    return angular.copy(user);
                }
            }
            return null;
        }
        
        function updateUser(userId, newUser) {
            for(var u in users){
                var user = users[u];
                if(user._id === userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return user;
                }
            }
            return null;
        }

    }
})();