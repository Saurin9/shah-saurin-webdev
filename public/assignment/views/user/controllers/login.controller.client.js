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
                var loginUser = UserService.findUserByCredentials(user.username, user.password);
                if(loginUser != null){
                    $location.url('/profile/' + loginUser._id);
                }
                else {
                    vm.error = 'User not found !!';
                }
        }
        
    }
    
})();