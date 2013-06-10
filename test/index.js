var encode = require('../index'),
assert = require('assert'),
fs = require('fs'),
expect = '\u3042\u3044\u3046\u3048\u304a\u304b\u304d\u304f\u3051\u3053\n';

// EUC-JP to UTF-8
fs.readFile(__dirname + '/euc.txt', function(err, buf) {
    if (err) {
        console.log(err);
        return;
    } 
    encode(buf, 'EUC-JP', function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        assert.equal(data.toString('utf8'), expect, 'eucjp to utf8');
    });
});
// SJIS to UTF-8
fs.readFile(__dirname + '/sjis.txt', function(err, buf) {
    if (err) {
        console.log(err);
        return;
    } 
    encode(buf, 'SJIS-WIN', 'UTF-8', function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        assert.equal(data.toString('utf8'), expect, 'sjis to utf8');
    });
});
