(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;

        function init() {
          // vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                })
        }
        init();

        function getYoutubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length-1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
        
        function getTrustedHtml(html) {
            console.log(html);
            return $sce.trustAsHtml(html);
        }
        
        
        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widgets/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }

        //console.log(vm.websites);


    }
})();