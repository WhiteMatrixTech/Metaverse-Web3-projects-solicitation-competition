const Pixel = require("../models/pixel");

exports.getAPIPixelInfo = (req, res, next) => {
    function fail(err) {
        return res.status(500).json({ success: false, error: { message: "An error occurred while trying to look up information about that pixel." } })
    }
    if(!req.query.x || !req.query.y) return res.status(400).json( { success: false, error: { message: "You did not specify the coordinates of the pixel to look up.", code: "bad_request" } });
    Pixel.find({xPos: req.query.x, yPos: req.query.y}).then((pixels) => {
        if (pixels.length <= 0) return res.json({ success: true, pixel: null });
        let info = pixels[0].getInfo();
        res.json({ success: true, pixel: info })
    }).catch((err) => fail(err));
};
