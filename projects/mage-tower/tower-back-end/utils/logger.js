const config = require('../config/config');

let errors = 0;

const topicColour = "\x1b[34m"; // blue
const resetColour = "\x1b[0m";
const methodColours = {
    log: "\x1b[35m", // magenta
    info: "\x1b[32m", // green
    warn: "\x1b[33m", // yellow
    error: "\x1b[31m" // red
};

var lastLogTime = null;
var messagesSinceLastDatestamp = 0;

for (const method of Object.keys(console)) {
    exports[method] = function log(topic, ...args) {
        // Datestamp calculation
        var now = new Date();
        // show datestamp for every unique date or every 50 messages for legibility
        if (lastLogTime != null ? now.toDateString() !== lastLogTime.toDateString() : true || messagesSinceLastDatestamp > 50) {
            console.log(`--------- [ MESSAGES ON ${now.toLocaleDateString()} ] ---------`);
            messagesSinceLastDatestamp = 0;
        } else {
            messagesSinceLastDatestamp++
        }
        lastLogTime = now;
        // Actual logging
        console[method](new Date().toLocaleTimeString(), `${topicColour}[${topic.toUpperCase()}]`, `${methodColours[method] || ""}${method.toUpperCase()}:${resetColour}`, ...args);
    };
}


exports.capture = (error, extra = null) => {
    errors++;

    // extra is an optional param to give stuff context, like user's etc

    exports.error('ERROR', error, extra);
};

