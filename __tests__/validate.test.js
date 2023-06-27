const validator = require('../validate.js');

test('Checks if requires password to be longer than 7 digits', () => {

  expect(validator('ojiw')).toBe(true);

});

