(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);
    
    function profileController($routeParams, UserService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];           // Parses and stores the part of the URL in place of the ':uid" in
                                                    // the URL of profile as written in the config file
        vm.update = update;
        vm.deleteAccount = deleteAccount;
        
        function update(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if (user==null){
                vm.error = "Unable to update user !";
            }
            else{
                vm.message = "User profile successfully updated !";
            }
        }

        function deleteAccount(userToDelete) {
            UserService.deleteUser(userId, userToDelete);
            $location.url('/login');
        }
        
        var user = UserService.findUserById(userId);
        vm.user = user;

        console.log(user);


    }
    
})();