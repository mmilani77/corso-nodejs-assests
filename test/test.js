var tap = require('tap');
var test = tap.test;
var asset = require('../index.js');

/*test('inserimento', (t) => {
    asset.insertAsset({
        state: '1',
        type: '2',
        description: '3'
    }, (err) => {
        t.error(err)

        t.end()
    })
})*/
/*
test('verificaid', (t) => {
    asset.queryAsset({
        state: '1',
        type: '2',
        description: '3'
    }, (err) => {
        t.error(err)

        t.end()
    })

})*/

test('verifica update', (t) => {
    asset.updateAsset('5756d9dd5a8ab408207a4085', {
        state: '3',
        type: '4',
        description: '5'
    }, (err) => {
        t.error(err)

        t.end()
    })

})