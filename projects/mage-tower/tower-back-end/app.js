const mongoose = require("mongoose");
const PaintingManager = require("./managers/PaintingManager");
const readline = require("readline").createInterface({input: process.stdin, output: process.stdout});
const HTTPServer = require("./utils/HTTPServer");
const WebsocketServer = require("./utils/WebSocketServer");
const ResponseFactory = require("./utils/ResponseFactory");
const ChainSubscriber = require('./utils/ChainSubscriber');
const PixelNotificationManager = require("./utils/PixelNotificationManager");
const fs = require("fs");
const path = require("path");
const System = require("./models/system");


let app = {};

app.logger = require('./utils/logger');

app.loadConfig = (path = "./config/config") => {
    delete require.cache[require.resolve(path)];
    var oldConfig = app.config;
    app.config = require(path);
    // app.colours = [... new Set((app.config.colours || ["#FFFFFF", "#E4E4E4", "#888888", "#222222", "#FFA7D1", "#E50000", "#E59500", "#A06A42", "#E5D900", "#94E044", "#02BE01", "#00D3DD", "#0083C7", "#0000EA", "#CF6EE4", "#820080"]).map((c) => c.toUpperCase()))];
    if(oldConfig && (oldConfig.secret !== app.config.secret || oldConfig.database !== app.config.database || oldConfig.boardSize !== app.config.boardSize)) {
        app.logger.log("Configuration", "We are stopping the Place server because the database URL, secret, and/or board image size has been changed, which will require restarting the entire server.");
        process.exit(0);
    }
    if(oldConfig && (oldConfig.port !== app.config.port || oldConfig.onlyListenLocal !== app.config.onlyListenLocal)) app.restartServer();
};

app.loadConfig();

// System.findone({}, (err, system) => {
//     console.log(system);
// });

app.responseFactory = (req, res) => new ResponseFactory(app, req, res);

app.pixelNotificationManager = new PixelNotificationManager(app);

app.dataFolder = path.resolve(__dirname, ".place-data");
if (!fs.existsSync(app.dataFolder)) fs.mkdirSync(app.dataFolder);

app.contractFolder = path.resolve(__dirname, "contract");

app.paintingManager = PaintingManager(app);
app.logger.info('Startup', "Loading image from the database…");
app.paintingManager.loadImageFromDatabase().then((image) => {
    app.paintingManager.startTimer();
    app.logger.info('Startup', "Successfully loaded image from database.");
}).catch((err) => {
    app.logger.capture("Error while loading the image from database: " + err);
});

app.recreateServer = () => {
    app.httpServer = new HTTPServer(app);
    app.server = app.httpServer.httpServer;
    app.websocketServer = new WebsocketServer(app, app.server);
};
app.recreateServer();

mongoose.connect(process.env.DATABASE || app.config.database);

// system table
System.findOne({}, (err, system) => {
    if (system === null) {
        const s = new System();
        s.totalShares = 0;
        s.save()
    }
});

app.chainEventsSubscriber = () => {
    app.eventsSubscriber = new ChainSubscriber(app);
};

app.chainEventsSubscriber();

app.stopServer = () => {
    if(app.server.listening) {
        app.logger.log('Shutdown', "Closing server…");
        app.server.close();
        setImmediate(function() { app.server.emit("close"); });
    }
};

app.restartServer = () => {
    app.stopServer();
    app.server.listen(process.env.PORT || app.config.port, (process.env.ONLY_LISTEN_LOCAL ? process.env.ONLY_LISTEN_LOCAL === true : app.config.onlyListenLocal) ? "127.0.0.1" : null, null, () => {
        app.logger.log('Startup', `Started Place server on port ${app.config.port}${app.config.onlyListenLocal ? " (only listening locally)" : ""}.`);
    });
};
app.restartServer();
app.recreateRoutes = () => {
    app.httpServer.setupRoutes();
};

app.recreateRoutes();


readline.on('line', i => {
    try {
        var output = eval(i);
        output instanceof Promise
            ? output.then(a => {
                console.log('Promise Resolved');
                console.log(util.inspect(a, {depth: 0}))
            }).catch(e => {
                console.log('Promise Rejected');
                console.log(e.stack)
            })
            : output instanceof Object
            ? console.log(util.inspect(output, {depth: 0}))
            : console.log(output)
    } catch (err) {
        console.log(err.stack)
    }
});
