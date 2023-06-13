const validator = require("../validate.js")



test('Checks if password is longer than 7 digits', () => {
  expect(validator("iikendovnwonvojw")).toBe(true);
});