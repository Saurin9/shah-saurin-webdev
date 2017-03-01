(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location){
        var vm = this;
        var verifypassword = null;
        vm.verifypassword = verifypassword;

        vm.register = register;

        function register(user, verifypassword){
            if(user.password === verifypassword){
                //console.log(user);
                var promise = UserService.findUserByUsername(user.username);

                promise.success(function (user) {
                    vm.error1 = "This username already exists. Please choose another one !";
                });

                promise.error(function (err) {
                   // console.log(user);
                    var promise = UserService.createUser(user);
                    promise.success(function (user) {
                            $location.url('/profile/' + user._id);
                    });
                });

                // var checkIfUserExists = UserService.findUserByUsername(user.username);
                // if(checkIfUserExists === 0){
                //     var user = UserService.createUser(user);
                //     $location.url('/profile/' + user._id);
                // }
                // else{
                //     vm.error1 = "This username already exists. Please choose another one !";
                // }
            }
            else{
                vm.error2 = "Passwords do not match! Please re-enter.";
            }
        }
    }
})();