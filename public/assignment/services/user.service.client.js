(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService($http) {

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
        }

        function findUserByUsername(username){
            return $http.get("/api/user/?username=" + username);
        }
        
        function deleteUser(userId) {
            return $http.delete("/api/user/" + userId);
        }

        function findUserById(uid) {
            return $http.get("/api/user/" + uid);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password);
        }
        
        function updateUser(userId, newUser) {
            return $http.put("/api/user/" + userId, newUser);
        }

    }
})();