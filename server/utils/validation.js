/**
 * Input validation utilities
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
const validateEmail = (email) => {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} { isValid: boolean, message: string }
 */
const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return {
      isValid: false,
      message: 'Password must be at least 6 characters',
    };
  }

  // Optional: Add stronger validation
  // if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
  //   return {
  //     isValid: false,
  //     message: 'Password must contain uppercase, lowercase, and number',
  //   };
  // }

  return { isValid: true, message: 'Password is valid' };
};

/**
 * Validate name
 * @param {string} name - Name to validate
 * @returns {object} { isValid: boolean, message: string }
 */
const validateName = (name) => {
  if (!name || name.trim().length < 2) {
    return {
      isValid: false,
      message: 'Name must be at least 2 characters',
    };
  }

  if (name.trim().length > 50) {
    return {
      isValid: false,
      message: 'Name cannot exceed 50 characters',
    };
  }

  return { isValid: true, message: 'Name is valid' };
};

/**
 * Validate registration data
 * @param {object} data - Registration data
 * @returns {object} { isValid: boolean, errors: object }
 */
const validateRegisterData = (data) => {
  const errors = {};

  if (!data.name) {
    errors.name = 'Name is required';
  } else {
    const nameValidation = validateName(data.name);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.message;
    }
  }

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please provide a valid email address';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else {
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.message;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate login data
 * @param {object} data - Login data
 * @returns {object} { isValid: boolean, errors: object }
 */
const validateLoginData = (data) => {
  const errors = {};

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please provide a valid email address';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validateRegisterData,
  validateLoginData,
};
