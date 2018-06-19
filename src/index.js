var Validator = require('./Validator.js')
var strategies = require('./ValidatorStrategy.js')

var data = {
    firstName: "Super",
    lastName: "Man",
    age: "unknown",
    userName: "o_O"
}

let validator = new Validator(strategies)
validator.config = {
    firstName: "isNonEmpty",
    age: "isNumber",
    userName: "isAlphaNum"
}

validator.validate(data)
if (validator.hasErrors()) {
    console.log(validator.messages.join("\n"))
}


