const express = require("express");
const BoardImageController = require("../controllers/BoardImageController");
const PixelInfoController = require("../controllers/PixelInfoController");
const PlaceController = require("../controllers/PlaceController");


function APIRouter(app) {
    let router = express.Router();

    router.use(function(req, res, next) {
        res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
        res.header("Expires", "-1");
        res.header("Pragma", "no-cache");
        next();
    });

    router.get("/board-image", BoardImageController.getAPIBoardImage);
    router.get("/timer",  PlaceController.getAPITimer);
    router.get("/pixel", PixelInfoController.getAPIPixelInfo);
    router.get("/pos-info", PixelInfoController.getAPIPixelInfo);
    router.post("/place", PlaceController.postAPIPixel);
    router.get("/start-time", PlaceController.getAPIStartTime);
    router.get("/online", function(req, res, next) {
        return res.json({
            success: true,
            online: {
                count: req.place.websocketServer.connectedClients
            }
        });
    });
    return router;
}

APIRouter.prototype = Object.create(APIRouter.prototype);

module.exports = APIRouter;
