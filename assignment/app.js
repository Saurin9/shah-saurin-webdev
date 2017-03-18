
// This app.js executes on the 'server' and has no relation with the 'app.js' in the 'public/assignment' directory of
// which executes on the 'client'. The name 'app.js' is commonly used. So same name.
// Even though both are written in JavaScript, they execute under different environments/frameworks.

module.exports = function (app) {

    var model = require("./models/model.server")();

    require("./services/user.service.server")(app, model);
    require("./services/website.service.server")(app, model);
    // require("./services/page.service.server")(app, model);
    // require("./services/widget.service.server")(app, model);

};