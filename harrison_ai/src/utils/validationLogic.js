import validator from 'email-validator';

export const validatePassword = (password) => {
  const specialCharacters = '[`!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]/';
  const alphabets = 'abcdefghijklmnopqrstuvwxyz';
  if (password.length <= 8) {
    return false;
  }

  let hasLowerCase = false;
  let hasUpperCase = false;
  let hasNumericalValue = false;
  let hasSpecialCharacter = false;

  for (let passwordCharacter of password.split('')) {
    if (alphabets.includes(String(passwordCharacter).toLowerCase())) {
      if (passwordCharacter === passwordCharacter.toUpperCase()) {
        hasUpperCase = true;
      }
      if (passwordCharacter === passwordCharacter.toLowerCase()) {
        hasLowerCase = true;
      }
    }
    if (Number.isInteger(Number(passwordCharacter))) {
      hasNumericalValue = true;
    }
    if (specialCharacters.split('').includes(passwordCharacter)) {
      hasSpecialCharacter = true;
    }
  }
  if(!hasUpperCase || !hasLowerCase || !hasNumericalValue || !hasSpecialCharacter) {
    return false;
  }
  return true;
}

export const validateEmail = (email) => validator.validate(email);
