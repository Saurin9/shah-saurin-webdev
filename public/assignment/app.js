
// This app.js executes on the 'client' and has no relation with the 'app.js' in the 'assignment' directory of the root
// which executes on the 'server'. The name 'app.js' is commonly used. So same name.
// Even though both are written in JavaScript, they execute under different environments/frameworks.
// This app.js excutes under the 'Angular' framework.

(function () {
    angular
        .module("WebAppMaker", ["ngRoute", "textAngular"]);
})();