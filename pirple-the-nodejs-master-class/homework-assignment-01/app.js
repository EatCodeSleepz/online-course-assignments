const http = require('http');
const url = require('url');

const PORT = 8080;

const httpServer = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true);
    const pathname = parseUrl.pathname;

    log(`Pathname [${pathname}]`);

    route(pathname, req, res);
});

httpServer.listen(PORT, function() {
    log(`Listening on port ${PORT}`);
});

const handleHello = function(req, res) {
    const now = Date.now();
    const payload = {
        'message': `Hello ${now}`
    };

    handleHelper(req, res, 200, payload);
};

const handleStat404 = function(req, res) {
    const now = Date.now();
    const payload = {
        'message': `Not found ${now}`
    };

    handleHelper(req, res, 404, payload);
};

function handleHelper(req, res, httpStatus, payload) {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(httpStatus);

    const strPayload = payload !== null ? JSON.stringify(payload) : null;
    log(strPayload);

    res.end(strPayload);
}

// route stuffs
function route(pathname, req, res) {
    const path = (pathname + '').toLowerCase();

    // i'm aware that /hello/ wont get triggered. but regex is ugly here
    if (path === '/hello') {
        // if getting bigger, each handler can be grouped and put to separate file
        handleHello(req, res);
    } else {
        handleStat404(req, res);
    }
}

// single point log, can switch how we log
function log(str) {
    console.log(str);
}
