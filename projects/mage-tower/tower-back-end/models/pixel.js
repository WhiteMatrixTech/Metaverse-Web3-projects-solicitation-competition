const DataModelManager = require("../managers/DataModelManager");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let colourPieceValidator = function (c) {
    return Number.isInteger(c) && c >= 0 && c <= 255;
};

let PixelSchema = new Schema({
    xPos: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value"
        }
    },
    yPos: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value"
        }
    },
    editorAddress: {
        type: String,
        required: true
    },
    lastModified: {
        type: Date,
        required: true
    },
    colourR: {
        type: Number,
        required: true,
        validate: {
            validator: colourPieceValidator,
            message: "{VALUE} is not a valid colour"
        }
    },
    colourG: {
        type: Number,
        required: true,
        validate: {
            validator: colourPieceValidator,
            message: "{VALUE} is not a valid colour"
        }
    },
    colourB: {
        type: Number,
        required: true,
        validate: {
            validator: colourPieceValidator,
            message: "{VALUE} is not a valid colour"
        }
    }
});

PixelSchema.methods.toInfo = function() {
    return {
        point: {
            x: this.xPos,
            y: this.yPos
        },
        address: this.editorAddress,
        modified: this.lastModified,
        colour: this.getHexColour()
    };
};

PixelSchema.statics.addPixel = function(colour, x, y, address, app, callback) {
    let pn = this;
    x = parseInt(x);
    y = parseInt(y);
    if(isNaN(x) || isNaN(y)) return callback(null, { message: "Invalid positions provided." });
    // TODO: Get actual position below:
    if(x < 0 || y < 0 || x >= app.config.boardSize || y >= app.config.boardSize) return callback(null, { message: "Position is out of bounds." });
    this.findOne({
        xPos: x,
        yPos: y
    }, {
        editorAddress: "0x0",
        colourR: 255,
        colourG: 255,
        colourB: 255
    }).then((pixel) => {
        // Find the pixel at this location
        if(!pixel) { // if the spot was blank, create a new one
            pixel = pn({
                xPos: x,
                yPos: y
            });
        }
        // change our appropriate fields
        pixel.editorAddress = address;
        pixel.colourR = colour.r;
        pixel.colourG = colour.g;
        pixel.colourB = colour.b;
        pixel.lastModified = Date();
        // save the changes
        pixel.save().then((p) => {
            callback(true, null); // report back that we changed the pixel
        }).catch((err) => {
            callback(null, { message: "An error occurred while trying to place the pixel." });
        })
    }).catch((err) => {
        callback(null, { message: "An error occurred while trying to place the pixel." });
    });
};

PixelSchema.methods.getInfo = function() {
    return this.toInfo();
};

PixelSchema.methods.getSocketInfo = function() {
    return {x: this.xPos, y: this.yPos, colour: this.getHexColour()};
};

PixelSchema.methods.getHexColour = function() {
    return PixelSchema.statics.getHexFromRGB(this.colourR, this.colourG, this.colourB);
};

PixelSchema.statics.getHexFromRGB = function(r, g, b) {
    // Borrowed partly from: https://stackoverflow.com/a/5624139
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
};

PixelSchema.index({xPos: 0, yPos: 0});
module.exports = DataModelManager.registerModel("Pixel", PixelSchema);
