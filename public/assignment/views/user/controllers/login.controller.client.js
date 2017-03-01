(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location) {        // UserService is injected here so we can use its API here
                                                              // (like findUserByCredentials,etc)
                                                              // '$location' allows to modify the URL (to go to other page)
        var vm = this;
        vm.login = login;


            function login(user) {
                // *** IMP ***
                // Refer this file, 'app.js' of root and 'login.controller' to understand the following explanation.
                // This will return a object immediately, not the one returned by the server using '$http.get'. It promises
                // that it will return the server response which it might take time. This is given to the browser to handle.
                // We register for a successful callback from the server. So we write a promise.success() function which
                // the browser will call when it successfully gets the server response.
                // The response of the server is a JSON object, which is a user. So that object is passed to the
                // function in promise.function() as user (any name would work here)
                var promise = UserService.findUserByCredentials(user.username, user.password);
                promise.success(function (user) {          // 'user' is the user JSON object returned by the server by $http.get
                    var loginUser = user;
                    console.log(loginUser);
                    if(user){
                        $location.url('/profile/' + user._id);
                    }
                    else {
                        vm.error = 'User not found !!';
                    }
                });

        }
        
    }
    
})();