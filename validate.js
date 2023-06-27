function validate(password) {
  let length = false;

  if (password.length > 7) length = true;

  return length
}

module.exports = validate;
