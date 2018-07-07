var Promise = require("promise");
var mongod = require('mongodb');
var mongoClient = mongod.MongoClient, db;
mongoClient.connect('mongodb://127.0.0.1/').then(function (con) {
    db = con.db('spl');
    console.log("db running");
});

module.exports.getDefinition = function () {
    var o_id = new mongod.ObjectID('5b409b7aacfc2c2ab4e7db2d');
    return new Promise(function (fulfill, reject) {
        db.collection('definition').find({_id: o_id}).toArray().then(function (data) {
            try {
                fulfill(data[0]);
            } catch (ex) {
                reject(ex);
            }
        });
    });
};




function getNextSequence(name) {
    return db.collection('counters').findAndModify({_id: name}, null, {$inc: {seq: 1}});
}

var xxx = {
    "uid": "people",
    "title": "افراد",
    "group": [
        {
            "uid": "primaryInfo",
            "title": "اطلاعات اولیه",
            "questions": [
                {
                    "uid": "fname",
                    "title": "نام",
                    "fieldInfo": {
                        "type": "text"
                    }
                },
                {
                    "uid": "lname",
                    "title": "نام خانوادگی",
                    "fieldInfo": {
                        "type": "text"
                    }
                },
                {
                    "uid": "lname",
                    "title": "تاریخ تولد",
                    "fieldInfo": {
                        "type": "text"
                    }
                },
                {
                    "uid": "lname",
                    "title": "شماره تلفن",
                    "fieldInfo": {
                        "type": "text"
                    }
                }
            ]
        },
        {
            "uid": "contactInfo",
            "title": "اطلاعات تماس",
            "questions": [
                {
                    "uid": "homePhone",
                    "title": "نام",
                    "fieldInfo": {
                        "type": "text"
                    }
                },
                {
                    "uid": "cellPhone",
                    "title": "تلفن همراه",
                    "fieldInfo": {
                        "type": "text"
                    }
                },
                {
                    "uid": "city",
                    "title": "شهر محل سکونت",
                    "fieldInfo": {
                        "type": "text"
                    }
                },
                {
                    "uid": "street",
                    "title": "خیابان",
                    "fieldInfo": {
                        "type": "text"
                    }
                }
            ]
        }
    ]
};
module.exports.insertDummy = function () {
    db.collection('definition').insertOne(xxx).then(function (data) {
        console.log('inserted');
    });
};