const inputJson = `
// Put your test json here!
`
const inputObj = JSON.parse(inputJson);

const index = require('./index');
const response = index.handler(inputObj, {})