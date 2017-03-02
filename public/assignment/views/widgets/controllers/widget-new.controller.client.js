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
            // vm.widget = WidgetService.findWidgetById(vm.widgetId);
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                })

            // vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                })
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widgets/templates/new/widget-'+ vm.widgetType + '-new.view.client.html';
        }

        function createWidget(widget) {
            var newWidget;
            if(vm.widgetType === 'HEADER') {
                newWidget = {"text": widget.text, "size": widget.size, "widgetType" : vm.widgetType};
            } else if (vm.widgetType === 'HTML') {
                newWidget = {"text": widget.text, "widgetType" : vm.widgetType};
            } else {
                newWidget = {"url": widget.url, "width": widget.width, "widgetType" : vm.widgetType};
            }

            // newWidget = WidgetService.createWidget(vm.pageId,newWidget);
            WidgetService
                .createWidget(vm.pageId,newWidget)
                .success(function (newWidget) {
                    if(newWidget == null) {
                        console.log("error");
                    } else {
                        $location.url("/user/"+ vm.userId +"/website/"+ vm.websiteId +"/page/" + vm.pageId + "/widget/");
                    }
                })
        }

    }
})();