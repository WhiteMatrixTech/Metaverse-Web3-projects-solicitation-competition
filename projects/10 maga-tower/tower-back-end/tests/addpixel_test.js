const User = require("../models/user");
const mongoose = require("mongoose");

function test_datetime() {
    const datetime = new Date('2021-09-30T00:00:00+08:00');
    console.log((datetime.getTime() - Date.now()) / 1000) ;
}

// test_datetime();

function for_each() {
    mongoose.connect("mongodb://localhost/place");
    User.find({}).sort({'shares': -1}).limit(10).exec(function (err, users) {
        // users.forEach((user, index) => {
        //     console.log(user.toInfo());
        // })
        // console.log(err);
        // console.log(users);
        // console.log(users);
        let results = [];
        users.forEach((user, index) => {
            // console.log(user.toInfo());
            results.push(user.toInfo());
        });
        console.log(results);
        // users.map()
    }).then(()=> {
        mongoose.disconnect();
    });
}

for_each();
