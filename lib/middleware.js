var proxy = require("http-proxy-middleware");
var config = require("./config-load")();
const ENDPOINT = config.ENDPOINT;
const API_KEY = config.API_KEY;
const DEBUG_MODE = config.DEBUG_MODE;

const activityProxy = proxy('/site-activity', {
    target: `${ENDPOINT}`,
    changeOrigin: true,             // for vhosted sites, changes host header to match to target's host
    logLevel: (DEBUG_MODE) ? 'debug' : '',
});

module.exports = activityProxy;
