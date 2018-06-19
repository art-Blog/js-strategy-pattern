module.exports = strategy = {
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
