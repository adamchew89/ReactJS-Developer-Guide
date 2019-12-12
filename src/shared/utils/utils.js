export const updateObject = (oldObject, updatedProperties) => {
  return { ...oldObject, ...updatedProperties };
};

export const checkValidity = (value, validation) => {
  let isValid = true;
  // Check if input has configured validation
  if (!validation) {
    // Returns truish since no validation
    return true;
  }
  if (validation.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid;
  }
  if (validation.maxLength) {
    isValid = value.length <= validation.minLength && isValid;
  }
  return isValid;
};
