import { validateEmail, validatePassword } from "./validationLogic";

const validEmail = 'rad@crazy.com';
const invalidEmail = 'radddyyyyy.co';
const validPassword = 'dskdjssDKDIDM383848#@$$%';
const invalidPasswordShort = 'eiei';
const invalidPasswordNoCap = 'kdidjfid833838**()';
const invalidPasswordNoLower = 'KDKDIDKDDS833838**()';
const invalidPasswordNoDigits = 'KDKDIDKDDddieejjdj**()';
const invalidPasswordNoSpecial = 'KDKDIDKDDddieejjdj837472';

test('Valid Email', () => {
  expect(validateEmail(validEmail)).toBe(true);
});

test('Invalid Email', () => {
  expect(validateEmail(invalidEmail)).toBe(false);
});

test('Valid Password', () => {
  expect(validatePassword(validPassword)).toBe(true);
});

test('Password too short', () => {
  expect(validatePassword(invalidPasswordShort)).toBe(false);
});

test('Password with no capital alphabets', () => {
  expect(validatePassword(invalidPasswordNoCap)).toBe(false);
});

test('Password with no lowercase alphabets', () => {
  expect(validatePassword(invalidPasswordNoLower)).toBe(false);
});

test('Password with no digits', () => {
  expect(validatePassword(invalidPasswordNoDigits)).toBe(false);
});

test('Password with no special characters', () => {
  expect(validatePassword(invalidPasswordNoSpecial)).toBe(false);
});