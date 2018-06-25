var assert = require('assert')
var fs = require('fs')
var streamEqual = require('stream-equal')

module.exports = function (vault, file, entry, cb) {
  assert.ok(vault, 'ddrive-fork: vault required')
  assert.equal(typeof file, 'string', 'ddrive-fork: file path required')
  if (typeof entry === 'function') {
    cb = entry
    entry = file
  }

  vault.stat(entry, function (err, stat) {
    if (err || !stat) return cb(null, false)
    fs.stat(file, function (err, fsStat) {
      if (err) return cb(err)
      if (fsStat.size !== stat.size) return cb(null, false)
      // TODO: Check mtimes?

      var fileStream = fs.createReadStream(file)
      var entryStream = vault.createReadStream(entry)
      streamEqual(fileStream, entryStream, cb)
    })
  })
}
