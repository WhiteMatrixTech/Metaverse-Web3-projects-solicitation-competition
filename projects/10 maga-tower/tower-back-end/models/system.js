const DataModelManager = require("../managers/DataModelManager");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var SystemSchema = new Schema({
    totalShares: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not a valid integer"
        },
        default: 0
    }
});

SystemSchema.methods.updateShares = function (oldShare, newShares) {
    this.totalShares = this.totalShares - oldShare + newShares;
    this.save();
    return this.totalShares;
};

module.exports = DataModelManager.registerModel("System", SystemSchema);
