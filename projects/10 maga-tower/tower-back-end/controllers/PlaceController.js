const User = require("../models/user");
const System = require("../models/system");

exports.postAPIPixel = (req, res, next) => {
    function getTimerPayload(user) {
        const seconds = user.getPlaceSecondsRemaining(req.place);
        const countData = {canPlace: seconds <= 0, seconds: seconds};
        return { success: true, timer: countData };
    }
    const address = req.body.address;
    User.findOneAndUpdate({address: address}, {address: address}, {new: true, upsert: true}, (err, user) => {
        if (err) {
            return res.status(500).json({ success: false, error: err })
        }
        user.updateLastPlace();
        return res.json(getTimerPayload(user));
    });
};

exports.getAPITimer = (req, res, next) => {
    function fail(err) {
        return res.status(500).json({ success: false, error: { message: "An error occurred while trying to look up information about the user by address.", err}})
    }
    function getTimerPayload(user) {
        const seconds = user.getPlaceSecondsRemaining(req.place);
        const countData = {canPlace: seconds <= 0, seconds: seconds};
        return { success: true, timer: countData };
    }
    if(!req.query.address) return res.status(400).json( { success: false, error: { message: "You did not specify the address to look up a user.", code: "bad_request" } });
    let address = req.query.address;
    User.find({address: address}).then((users) => {
        if (users.length <= 0) return res.json({ success: true, timer: {"canPlace": true, "seconds": "0"}});
        const user = users[0];
        return res.json(getTimerPayload(user));
    }).catch((err) => fail(err));
};

exports.getAPIStartTime = (req, res, next) => {
    function getStartTimer() {
        const startTime = req.place.config.startTime;
        const start = new Date(startTime).getTime() / 1000;
        // const current = new Date().getTime();
        // let diffSeconds = (start - current) / 1000;
        // let remainSeconds = Math.max(diffSeconds, 0);
        return Math.ceil(start);
    }
    return res.json({success: true, time: getStartTimer()});
};

exports.getAPIUserSharesRank = (req, res, next) => {
    function getUserSharesRank() {
        let results = [];
        User.find({}).sort({'shares': -1}).limit(10).exec(function (err, users) {
            if (err) {
                return res.status(500).json({ success: false, error: err });
            }
            users.forEach((user, index) => {
                results.push(user.toInfo());
            });
            return res.json({ success: true, users: results});
        })
    }
    return getUserSharesRank();
};

exports.getTotalShares = (req, res, next) => {
    function getSystemTotalShares() {
        System.findOne({}, (err, system) => {
            if (err) {
                return res.status(500).json({ success: false, error: err });
            }
            return res.json({success: true, totalShares: system.totalShares});
        });
    }
    return getSystemTotalShares();
};
