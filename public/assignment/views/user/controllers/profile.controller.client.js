(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);
    
    function profileController($routeParams, UserService, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];           // Parses and stores the part of the URL in place of the ':uid" in
                                                    // the URL of profile as written in the config file
        vm.update = update;
        vm.deleteAccount = deleteAccount;


        function init() {
            // var user = UserService.findUserById(vm.userId);
            var promise = UserService.findUserById(vm.userId);
            promise.success(renderUser);

            // vm.user = user;
            // console.log(user);
        };
        init();

        function renderUser(user) {
            vm.user = user;
            console.log(user);
        }


        function update(newUser) {
            var promise = UserService.updateUser(vm.userId, newUser);
            promise.success(function (user) {
                if (user==null){
                    vm.error = "Unable to update user !";
                }
                else{
                    vm.message = "User profile successfully updated !";
                }
            })

        }

        function deleteAccount(userToDelete) {
            UserService
                .deleteUser(vm.userId, userToDelete)
                .success(function (user) {
                   if(user){
                       $location.url('/login');
                   }
                   else{
                       vm.error = "Unable to delete the user !";    // ** This is not working !! Check!!
                   }
                });
            // $location.url('/login');
        }


    }
    
})();