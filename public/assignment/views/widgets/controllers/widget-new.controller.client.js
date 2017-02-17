(function () {

    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];
        vm.widgetType = $routeParams['wgtype'];

        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.createWidget = createWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widgets/templates/new/widget-'+ vm.widgetType + '-new.view.client.html';
        }

        function createWidget (widget) {
            WidgetService.createWidget(vm.pageId,widget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");

        }

        // function createWebsite(website) {
        //     WebsiteService.createWebsite(vm.userId, website);
        //     // vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
        //     $location.url("/user/" + vm.userId + "/website");
        // };



    }
})();