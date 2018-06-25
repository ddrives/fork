var fs = require('fs')
var test = require('tape')
var ddrive = require('@ddrive/core')
var dwRem = require('@dwcore/rem')

var isFork = require('.')

test('dDrive Fork Tests: duplicate with same name', function (t) {
  var vault = ddrive(dwRem)
  vault.writeFile('example.js', fs.readFileSync('example.js'), function (err) {
    t.ifError(err)

    isFork(vault, 'example.js', function (err, duplicate) {
      t.ifError(err)
      t.ok(duplicate, 'example.js is duplicate')
      t.end()
    })
  })
})

test('dDrive Fork Tests: duplicate with different name', function (t) {
  var vault = ddrive(dwRem)
  vault.writeFile('different.js', fs.readFileSync('example.js'), function (err) {
    t.ifError(err)

    isFork(vault, 'example.js', 'different.js', function (err, duplicate) {
      t.ifError(err)
      t.ok(duplicate, 'example.js is duplicate of different.js')
      t.end()
    })
  })
})

test('dDrive Fork Tests: file not in vault', function (t) {
  var vault = ddrive(dwRem)
  vault.writeFile('example.js', fs.readFileSync('example.js'), function (err) {
    t.ifError(err)

    isFork(vault, 'index.js', function (err, duplicate) {
      t.ifError(err)
      t.notOk(duplicate, 'index.js is not a duplicate')
      t.end()
    })
  })
})

test('dDrive Fork Tests: not duplicate of file in vault', function (t) {
  var vault = ddrive(dwRem)
  vault.writeFile('example.js', fs.readFileSync('example.js'), function (err) {
    t.ifError(err)

    isFork(vault, 'example.js', 'index.js', function (err, duplicate) {
      t.ifError(err)
      t.notOk(duplicate, 'index.js is not a duplicate')
      t.end()
    })
  })
})

test('dDrive Fork Tests: not duplicate of file in vault other way', function (t) {
  var vault = ddrive(dwRem)
  vault.writeFile('example.js', fs.readFileSync('example.js'), function (err) {
    t.ifError(err)

    isFork(vault, 'index.js', 'example.js', function (err, duplicate) {
      t.ifError(err)
      t.notOk(duplicate, 'index.js is not a duplicate')
      t.end()
    })
  })
})
