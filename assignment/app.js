
// This app.js executes on the 'server' and has no relation with the 'app.js' in the 'public/assignment' directory of
// which executes on the 'client'. The name 'app.js' is commonly used. So same name.
// Even though both are written in JavaScript, they execute under different environments/frameworks.

module.exports = function (app) {
    require("./services/user.service.server")(app);
    require("./services/website.service.server")(app);
    require("./services/page.service.server")(app);
    require("./services/widget.service.server")(app);

};