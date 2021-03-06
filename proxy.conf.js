'use strict'
/**
 * @author Viet Nghiem
 *
 * https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md
 */
module.exports = {
    '/api/v1/*': {
        'target': 'http://13.250.41.43:5052',
        'pathRewrite': { '^/api/v1': '/childCode/api/v1' },
        'secure': false,
        'logLevel': 'debug',
        'changeOrigin': true,
        'ws': true,
        "bypass": function (req, res, proxyOptions) {
            req.headers["X-Client-ID"] = "";
            req.headers["X-Client-Token"] = "";
        }
    }
}
