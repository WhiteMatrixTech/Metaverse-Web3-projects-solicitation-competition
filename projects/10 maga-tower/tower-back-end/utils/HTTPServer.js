const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const helmet = require("helmet");
const session = require("cookie-session");
const fs = require("fs");

function HTTPServer(app) {
    var server = express();
    var httpServer = require("http").createServer(server);

    // Setup for parameters and bodies
    server.use(bodyParser.urlencoded({extended: false}));
    server.use(bodyParser.json());

    // server.use(helmet());

    const setupRoutes = function () {

        // Log to console
        if (app.config.debug) {
            // Log requests to console
            server.use(morgan("dev"));

            // Pretty-print JSON
        } else {
            var logInfo = {};
            if (fs.existsSync("/var/log/canvas")) logInfo.stream = require("stream-file-archive")({
                path: "/var/log/canvas/access-%Y-%m-%d.log",  // Write logs rotated by the day
                symlink: "/var/log/canvas/current.log",    // Maintain a symlink called current.log
                compress: true                // Gzip old log files
            });
            server.use(morgan("common", logInfo));
        }

        server.set("json spaces", 4);
        server.set("trust proxy", typeof app.config.trustProxyDepth === "number" ? app.config.trustProxyDepth : 0);

        // Setup passport for auth
        server.use(session({
            secret: app.config.secret,
            name: "session"
        }));

        server.use(function (req, res, next) {
            req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge;
            if (req.session.maxAge) req.session.random = Math.random() * 1000; // Force new cookie
            next();
        });


        // server.use(csurf());
        // server.use((req, res, next) => {
        //     res.locals._csrf = req.csrfToken();
        //     next();
        // });


        server.use((req, res, next) => {
            req.place = app;
            req.responseFactory = app.responseFactory(req, res);
            next();
        });


        // server.use((req, res, next) => app.moduleManager.processRequest(req, res, next));

        // modulesWithRoutes.forEach((moduleRoutes) => {
        //     moduleRoutes.forEach((route) => server.use(route.root, route.middleware));
        // });

        // Handle routes
        server.use("/api", require("../routes/api")(app));
        // server.use("/admin", require("../routes/admin")(app));


        if (!app.config.debug) {
            // Production error handler, no stack traces shown to user
            server.use((err, req, res, next) => {
                if (err.code === 'EBADCSRFTOKEN') return res.status(403).json({
                    success: false,
                    error: {message: 'you tried, have a star.', code: 'invalid CSRF token'}
                });
                res.status(err.status || 500);
                return res.send({
                    success: false,
                    error: {message: "An unknown error occured.", code: "internal_server_error"}
                });
            });
        }

        // 404 pages
        server.use((req, res, next) => {
            res.status(404);
            // respond with json
            return res.send({
                success: false,
                error: {message: "Page not found", code: "not_found"}
            });
        });
    };

    return {
        server: server,
        httpServer: httpServer,
        setupRoutes: setupRoutes
    };
}

HTTPServer.prototype = Object.create(HTTPServer.prototype);

module.exports = HTTPServer;
