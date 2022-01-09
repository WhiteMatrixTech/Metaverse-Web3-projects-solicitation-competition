const mongoose = require("mongoose");
const System = require("../models/system");


mongoose.connect("mongodb://localhost/place");

System.findOne({}, (err, system) => {
    if (system === null) {
        const s = new System();
        s.totalShares = 2;
        s.save()
    } else {
        console.log(system.totalShares);
    }
    return
});


