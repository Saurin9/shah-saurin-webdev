(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.goToNewWidget = goToNewWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function goToNewWidget(widgetType) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/create/" + widgetType);
        }




    }

})();