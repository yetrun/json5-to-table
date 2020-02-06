// 任何一个测试都应该引入该文件

const test = require('ava')

global.inspect = require('util').inspect

module.exports = test
