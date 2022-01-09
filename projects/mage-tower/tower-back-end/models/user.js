const DataModelManager = require("../managers/DataModelManager");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Pixel = require("./pixel");
const System = require("./system");

var UserSchema = new Schema({
    address: {
        type: String,
        unique: true,
        required: true
    },
    lastPlace: {
        type: Date,
        required: false
    },
    placeCount: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not a valid integer"
        },
        default: 0
    },
    shares: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not a valid integer"
        },
        default: 0
    }
});


UserSchema.methods.toInfo = function() {
    return {
        id: this.id,
        address: this.address,
        statistics: {
            totalPlaces: this.placeCount,
            lastPlace: this.lastPlace,
            shares: this.shares
        },
    };
};

UserSchema.statics.register = function(address, callback) {
    const Schema = this;
    let newUser = Schema({
        address: address
    });
    newUser.save(function(err) {
        if (err) return callback(null, {
            message: "An account with that address already exists.",
            code: "address_taken",
            intCode: 400
        });
        return callback(newUser, null)
    });
};

UserSchema.statics.findByAddress = function(address, callback = null) {
    return this.findOne({
        address: address
    }, callback)
};


UserSchema.methods.addPixel = function(colour, x, y, count, shares, app, callback) {
    var user = this;
    Pixel.addPixel(colour, x, y, this.address, app, (changed, error) => {
        if (changed === null) return callback(null, error);
        if (changed) {
            System.findOne({}, (err, system) => {
                if (err) return callback(null, {
                    message: "An unknown error occurred while trying to place that pixel."
                });
                system.updateShares(user.shares, shares);
                user.lastPlace = new Date();
                user.placeCount = count;
                user.shares = shares;
                user.save((err) => {
                    if (err) return callback(null, {
                        message: "An unknown error occurred while trying to place that pixel."
                    });
                    return callback(changed, null);
                });
            });
        } else callback(changed, null);
    });
};

UserSchema.methods.updateLastPlace = function () {
    this.lastPlace = new Date();
    this.save();
    return this.lastPlace;
};

UserSchema.methods.getPlaceSecondsRemaining = function(app) {
    if (this.lastPlace) {
        let current = new Date().getTime();
        let place = this.lastPlace.getTime();
        // Seconds since last place
        let diffSeconds = (current - place) / 1000;
        // Seconds before can place again
        let remainSeconds = Math.min(app.config.placeTimeout, Math.max(0, app.config.placeTimeout - diffSeconds));
        return Math.ceil(remainSeconds);
    }
    return 0;
};

UserSchema.methods.canPlace = function(app) {
    return this.getPlaceSecondsRemaining(app) <= 0;
};


module.exports = DataModelManager.registerModel("User", UserSchema);
