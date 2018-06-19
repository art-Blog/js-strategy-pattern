

var validator = {
    types: {},
    messages: [],
    config: {},

    validate: function (data) {
        this.messages = []
        for (i in data) {
            // 逐一取得物件所有的屬性
            if (data.hasOwnProperty(i)) {
                type = this.config[i]
                checker = this.types[type]

                if (!type) { continue }

                if (!checker) {
                    throw {
                        name: "ValidationError", message: "No handler to validate type:" + type
                    }
                }
                result = checker.validate(data[i])
                if (!result) {
                    msg = "Invalid value for *" + i + "*, " + checker.instructions
                    this.messages.push(msg)
                }
            }
        }
        return this.hasErrors()
    },
    hasErrors: function () {
        return this.messages.length !== 0
    }

}

validator.types.isNonEmpty = {
    validate: function (value) {
        return value !== ""
    },
    instructions: "the value cannot be empty"
}

validator.types.isNumber = {
    validate: function (value) {
        return !isNaN(value)
    },
    instructions: "the value can only be a valid number, e.g. 1, 3.14 or 201"
}

validator.types.isAlphaNum = {
    validate: function (value) {
        return !/[^a-z0-9]/i.test(value)
    },
    instructions: "the value can only contain characters and numbers, no spe"
}



var data = {
    firstName: "Super",
    lastName: "Man",
    age: "unknown",
    userName: "o_O"
}

validator.config = {
    firstName: "isNonEmpty",
    age: "isNumber",
    userName: "isAlphaNum"
}

validator.validate(data)
if (validator.hasErrors()) {
    console.log(validator.messages.join("\n"))
}


