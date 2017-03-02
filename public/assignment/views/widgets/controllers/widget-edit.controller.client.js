(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];


        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.update = update;
        vm.deleteWidget = deleteWidget;

        function init() {
            // vm.widget = WidgetService.findWidgetById(vm.widgetId);
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                });

            // vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                })
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widgets/templates/editors/widget-'+vm.widget.widgetType+'-editor.view.client.html';
        }

        function update(editedWidget) {
            // var widget = WidgetService.updateWidget(vm.widgetId, editedWidget);
            WidgetService
                .updateWidget(vm.widgetId, editedWidget)
                .success(function (widget) {
                    if(widget==null){
                        vm.error = "Unable to update website !";
                    }
                    else{
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                    }
                })
        }

        function deleteWidget() {
            // WidgetService.deleteWidget(vm.widgetId);
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function (widget) {
                    if(widget){
                        $location.url("/user/" + vm.userId + "/website/" + vm.website + "/page/" + vm.pageId + "/widget/");
                    }
                })
        }


    }


})();