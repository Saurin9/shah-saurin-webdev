(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location){
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.deleteWebsite = deleteWebsite;
        vm.update = update;


        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        };
        init();

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.userId + "/website");
        }

        function update(editedWebsite) {
            var website = WebsiteService.updateWebsite(vm.websiteId, editedWebsite);
            if(website==null){
                vm.error = "Unable to update website !";
            }
            else{
                $location.url("/user/" + vm.userId + "/website");
            }
        }

    }
})();