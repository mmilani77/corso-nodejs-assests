'use strict';

var mongojs = require('mongojs')
var mongodb = require('mongodb').MongoClient;;
var url = 'mongodb://localhost:27017/assets';



var db = mongojs('assets', ['documents'])

var Joi = require('joi');

var findDocument = function (asset, db, callback) {
    db.documents.find(asset, function (err, docs) {
        console.log(docs);
        callback(null, docs);
    });

    /*, function (err, result) {
           if (err) {
               callback(err, null);
               return;
           }
           console.log('risultato');
           console.log(result.count());
           console.log('fine risultato');
           callback(null, result);
       });*/

}
var insertDocuments = function (asset, db, callback) {
    // Get the documents collection 
    var collection = db.collection('documents');
    // Insert some documents 
    collection.insertMany([asset], function (err, result) {
        if (err) {
            callback(err, null);
            return;
        }

        console.log("Inserito un asset");
        callback(null, result);
    });
}

var updateDocument = function (doc, newValues, db, callback) {
    db.mycollection.findAndModify({
        query: doc,
        update: {
            $set: newValues
        },
        new: true
    }, function (err, doc, lastErrorObject) {
        // doc.tag === 'maintainer'
    })

    /*, function (err, result) {
           if (err) {
               callback(err, null);
               return;
           }
           console.log('risultato');
           console.log(result.count());
           console.log('fine risultato');
           callback(null, result);
       });*/

}

var schema = Joi.object().keys({
    type: Joi.string().alphanum().required(),
    description: Joi.string().alphanum().required(),
    state: Joi.string().alphanum().required()
}).with('type', 'description', 'state');
module.exports.insertAsset = function (asset, cb) {

    Joi.validate(asset, schema, function (err, value) {
        if (err) {
            cb(err, null)
            return
        }

        //cb(null, 'ok')



        mongodb.connect(url, function (err, db) {
            //assert.equal(null, err);
            console.log("Connected correctly to server");

            insertDocuments(asset, db, function (err, result) {
                if (err) {
                    console.log(err);
                    cb(err, null);
                    return;
                }
                console.log('chiudo connessione');
                db.close();
                cb(null, result);
                // return;
            });
        });
    }); // err === null -> valid 

};
module.exports.updateAsset = function (asset_id, asset, cb) {

    db.documents.findAndModify({
        query: {
            _id: mongojs.ObjectId(asset_id)
        },
        update: {
            $set: asset
        },
        new: false
    }, function (err, doc, lastErrorObject) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log(doc);
        db.close();

        cb(null, doc);
        return;

        // doc.tag === 'maintainer'
    })
}
module.exports.queryAsset = function (asset, cb) {
    Joi.validate(asset, schema, function (err, value) {
        if (err) {
            cb(err, null)
            return
        }

        //cb(null, 'ok')



        // mongodb.connect(url, function (err, db) {
        //assert.equal(null, err);
        console.log("Connected correctly to server");

        findDocument(asset, db, function (err, result) {
            if (err) {
                console.log(err);
                cb(err, null);
                return;
            }
            console.log(result);
            db.close();
            cb(null, result);
            // return;
        });
        // });
    }); // err === null -> valid 
}