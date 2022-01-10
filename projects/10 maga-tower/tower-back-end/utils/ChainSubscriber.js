const User = require("../models/user");
const Pixel = require("../models/pixel");
const KeepAlive = require("./WSReconnect")
const abi = require("../contract/abi")
const { ethers } = require("ethers");

function ChainSubscriber(app) {

    const contractAddress = app.config.contract;

    // const eventListener = () => {
    //     const provider = new ethers.providers.JsonRpcProvider(app.config.provider);
    //     let contract = new ethers.Contract(contractAddress, abi, provider);
    //     contract.on("DoPixel", (operator, x, y, r, g, b, count) => {
    //         app.logger.info("ChainSubscriber", "chain event args:", operator, x, y, r, g, b, count);
    //         console.log(operator, x, y, r, g, b, count);
    //         const hex = Pixel.getHexFromRGB(r, g, b);
    //         contract.getShares(operator).then((shares) => {
    //             paint(operator, x, y, hex, count.toString(), shares.toString());
    //         });
    //     });
    //     KeepAlive({
    //         provider,
    //         onDisconnect: (err) => {
    //             eventListener();
    //             app.logger.error('ChainSubscriber', 'The ws connection was closed', err);
    //         },
    //     });
    // };
    //
    // eventListener();

    const provider = new ethers.providers.JsonRpcProvider(app.config.provider);
    let contract = new ethers.Contract(contractAddress, abi, provider);
    contract.on("DoPixel", (operator, x, y, r, g, b, count) => {
        app.logger.info("ChainSubscriber", "chain event args:", operator, x, y, r, g, b, count);
        console.log(operator, x, y, r, g, b, count);
        const hex = Pixel.getHexFromRGB(r, g, b);
        contract.getShares(operator).then((shares) => {
            paint(operator, x, y, hex, count.toString(), shares.toString());
        });
    });

    function paint(operator, x, y, hex, count, shares) {
        function paintWithUser(user) {
            if (!user.canPlace(place)) {
                app.logger.info("ChainSubscriber", "cannot place yet. address", operator);
                return;
            }
            if (!x || !y || !hex) {
                app.logger.info("ChainSubscriber", "x, y, hex invalid:", x, y, hex);
                return;
            }
            const _x = Number.parseInt(x), _y = Number.parseInt(y);
            const _count = Number.parseInt(count), _shares = Number.parseInt(shares);
            if(Number.isNaN(_x) || Number.isNaN(_y)) {
                app.logger.info("ChainSubscriber", "coordinates were incorrectly formatted", _x, _y);
                return;
            }
            if(Number.isNaN(_count) || Number.isNaN(_shares)) {
                app.logger.info("ChainSubscriber", "count and shares were incorrectly formatted", count, shares);
            }
            const rgb = app.paintingManager.getColourRGB(hex);
            app.paintingManager.doPaint(rgb, _x, _y, _count, _shares, user).then((pixel) => {
                const seconds = user.getPlaceSecondsRemaining(app);
                const countData = {canPlace: seconds <= 0, seconds: seconds};
                app.logger.info("ChainSubscriber", "seconds remain", countData);
            }).catch((err) => {
                console.log(err);
                app.logger.capture(`Error placing pixel: ${err}`, { user: user.toInfo() });
            });
        }
        const place = app;
        User.findOneAndUpdate({address: operator}, {address: operator}, {new: true, upsert: true}, (err, user) => {
            if (err) {
                app.logger.error("ChainSubscriber", "Find user error, got error:", err);
            }
            return paintWithUser(user);
        })
    }
}

ChainSubscriber.prototype = Object.create(ChainSubscriber.prototype);

module.exports = ChainSubscriber;
