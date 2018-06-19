

class Validator {
    constructor(config) {
        this.types = config
        this.messages = []
        this.config = {}
    }

    validate(data) {
        this.messages = []
        for (let i in data) {
            // 逐一取得物件所有的屬性
            if (data.hasOwnProperty(i)) {
                // console.log(i)
                let type = this.config[i]
                let checker = this.types[type]

                if (!type) { continue }

                if (!checker) {
                    throw {
                        name: "ValidationError", message: "No handler to validate type:" + type
                    }
                }
                let result = checker.validate(data[i])
                if (!result) {
                    let msg = "Invalid value for *" + i + "*, " + checker.instructions
                    this.messages.push(msg)
                }
            }
        }
        return this.hasErrors()
    }
    hasErrors() {
        return this.messages.length !== 0
    }

}


const config = {
    isNonEmpty: {
        validate: function (value) {
            return value !== ""
        },
        instructions: "the value cannot be empty"
    },
    isNumber: {
        validate: function (value) {
            return !isNaN(value)
        },
        instructions: "the value can only be a valid number, e.g. 1, 3.14 or 201"
    },
    isAlphaNum: {
        validate: function (value) {
            return !/[^a-z0-9]/i.test(value)
        },
        instructions: "the value can only contain characters and numbers, no spe"
    }
}

var data = {
    firstName: "Super",
    lastName: "Man",
    age: "unknown",
    userName: "o_O"
}

let validator = new Validator(config)
validator.config = {
    firstName: "isNonEmpty",
    age: "isNumber",
    userName: "isAlphaNum"
}

validator.validate(data)
if (validator.hasErrors()) {
    console.log(validator.messages.join("\n"))
}


