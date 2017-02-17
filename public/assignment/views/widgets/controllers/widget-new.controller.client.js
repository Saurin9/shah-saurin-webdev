(function () {

    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($sce, $routeParams, WidgetService) {
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
            return 'views/widgets/templates/new/widget-'+ type + '-new.view.client.html';
        }

        function createWidget (widget) {

        }



    }
})();