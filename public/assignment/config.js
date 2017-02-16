(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider, $locationProvider) {
        $routeProvider

            // User Routes
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            // .when("/user/:uid", {
            .when("/profile/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })

            // Website Routes
            .when("/user/:uid/website", {
                templateUrl: "views/websites/templates/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "views/websites/templates/website-new.view.client.html",
                controller: "WebsiteNewController",
                controllerAs: "model"
            })

            // **IMP**: The below controller needs to be declared after the one above as the one below is very broad
            // due to its link having '....:wid'. So it the page '..../new' qill never get loaded as pattern matches
            // with ':wid' always. So we declare the '../new' first, so in case it doesn't match with it then only
            // '...:wid' page gets loaded.
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/websites/templates/website-edit.view.client.html",
                controller: "WebsiteEditController",
                controllerAs: "model"
            })

            // Page Routes:
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/pages/templates/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/pages/templates/page-new.view.client.html",
                controller: "PageNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/pages/templates/page-edit.view.client.html",
                controller: "PageEditController",
                controllerAs: "model"
            })

            // Widget Routes
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widgets/templates/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            // .when("/user/:uid/website/:wid/page/:pid/widget", {
            //     templateUrl: "views/widgets/templates/widget-chooser.view.client.html",
            //     // controller: "WidgetListController",
            //     // controllerAs: "model"
            // })
            // .when("/user/:uid/website/:wid/page/:pid/widget", {
            //     templateUrl: "views/widgets/templates/widget-edit.view.client.html",
            //     // controller: "WidgetListController",
            //     // controllerAs: "model"
            // })
        ;

        // $locationProvider.html5Mode(true);
    }
})();