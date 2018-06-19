class Validator {
    constructor(types) {
        this.types = types
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
module.exports = Validator