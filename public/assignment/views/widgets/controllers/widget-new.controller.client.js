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

        function createWidget(widget) {
            //WidgetService.createWidget(vm.pageId,widget);
           // $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            var newWidget;
            if(vm.widgetType === 'HEADER') {
                newWidget = {"text": widget.text, "size": widget.size, "widgetType" : vm.widgetType};
            } else if (vm.widgetType === 'HTML') {
                newWidget = {"text": widget.text, "widgetType" : vm.widgetType};
            } else {
                newWidget = {"url": widget.url, "width": widget.width, "widgetType" : vm.widgetType};
            }
            newWidget = WidgetService.createWidget(vm.pageId,newWidget);
            if(newWidget == null) {
                console.log("error");
            } else {
                $location.url("/user/"+ vm.userId +"/website/"+ vm.websiteId +"/page/" + vm.pageId + "/widget/");
            }
        }

        // function createWebsite(website) {
        //     WebsiteService.createWebsite(vm.userId, website);
        //     // vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
        //     $location.url("/user/" + vm.userId + "/website");
        // };



    }
})();