var fs = require('fs')
var ddrive = require('@ddrive/core')
var dwRem = require('@dwcore/rem')

var isFork = require('.')

var vault = ddrive(dwRem)

vault.writeFile('example.js', fs.readFileSync('example.js'), function (err) {
  if (err) throw err
  isFork(vault, 'example.js', function (err, duplicate) {
    if (err) throw err
    console.log(`${duplicate.toString().toUpperCase()}: example.js is duplicate`)
  })
  isFork(vault, 'example.js', 'example.js', function (err, duplicate) {
    if (err) throw err
    console.log(`${duplicate.toString().toUpperCase()}: example.js is still duplicate`)
  })
  isFork(vault, 'index.js', function (err, duplicate) {
    if (err) throw err
    console.log(`${duplicate.toString().toUpperCase()}: index.js is not in vault so should be false`)
  })
  isFork(vault, 'example.js', 'index.js', function (err, duplicate) {
    if (err) throw err
    console.log(`${duplicate.toString().toUpperCase()}: index.js is not duplicate`)
  })
  isFork(vault, 'index.js', 'example.js', function (err, duplicate) {
    if (err) throw err
    console.log(`${duplicate.toString().toUpperCase()}: index.js is not duplicate the other way around either. weird.`)
  })
})
