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
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/websites/templates/website-edit.view.client.html",
                controller: "WebsiteEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/websites/templates/page-list.view.client.html",
                controller: "WebsiteEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/websites/templates/page-new.view.client.html",
                controller: "WebsiteEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/websites/templates/page-edit.view.client.html",
                controller: "WebsiteEditController",
                controllerAs: "model"
            })

            // Widget Routes
            // .when("/user/:uid/website/:wid/page/:pid/widget", {
            //     templateUrl: "views/widgets/templates/widget-list.view.client.html",
            //     // controller: "WidgetListController",
            //     // controllerAs: "model"
            // })
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