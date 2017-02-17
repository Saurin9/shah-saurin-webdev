(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];
        
        vm.getEditorTemplateUrl = getEditorTemplateUrl;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widgets/templates/editors/widget-'+type+'-editor.view.client.html';
        }


    }


})();