var express = require('express');        // 'require' will return the 'express' module
var app = express();                    // load (instantiate) the 'express' module

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require("./test/app.js")(app);

var assignment = require("./assignment/app.js");   //'require' returns a module which we can execute as a
                                                   // function using '()'
assignment(app);        // pass an instance of the 'Express' library (i.e. 'app' as declared on top) which allows
                        // to listen for various HTTP requests. This call loads the server.js in the 'assignment/app.js'
                        // in the root directory.


var port = process.env.PORT || 3000;

app.listen(port);