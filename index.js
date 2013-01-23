/**
 * Encode Buffer
 *
 * @public
 * @param {Buffer} buf buffer
 * @param {String} fromCharCode import char code
 * @param {String} toCharCode export char code (optional) default=UTF-8
 * @param {Function} callback result reciver callback
 */
function encode(buf, fromCharCode, toCharCode, callback) {
    if (typeof(toCharCode) === 'function') {
        callback = toCharCode;
        toCharCode = 'UTF-8'; 
    }
    var chunks = [],
    size = 0,
    batch = require('child_process').spawn(
        __dirname + '/lib/encode.php',
        [
            fromCharCode,
            toCharCode
        ]
        );

    batch.stdin.write(buf.toString('base64'));
    batch.stdin.end();

    batch.stdout.on('data', function(data) {
        chunks.push(data);
        size += data.length;
    });
    batch.on('exit', function(code) {
        if (code === 0) {
            callback(null, join(chunks, size));
        } else {
            callback(new Error('encode fail.'), null);
        }
    });
}

/**
 * join buffer
 *
 * @private
 * @param {Buffer[]} array buffer
 * @param {Number} size total buffer size
 * @return {Buffer} joined buffer
 */
function join(chunks, size) {
    var result,
    chunk,
    from = 0,
    result = new Buffer(size);
    while (chunk = chunks.shift()) {
        chunk.copy(result, from, 0);
        from += chunk.length;
    }
    return result;
}

module.exports = encode;
