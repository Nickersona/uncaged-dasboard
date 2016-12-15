var activityMiddleware = require('./lib/middleware');
var express = require('express')

const config = require('./lib/config-load')();
const PORT = config.PORT;

var app = express()

app.use(express.static('dist'));
app.use(activityMiddleware)

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT )
})
