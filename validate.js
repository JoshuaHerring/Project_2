function validate(password) {
    let length = true
    if (password.length < 7) length = false

    return length
    }

module.exports = validate