export const makeErrorService = () => {
  const errors = [];

  const addErrors = (newErrors) => {
    if (newErrors) {
      errors.push(...newErrors);
    }
  };

  const getErrors = () => {
    return errors;
  }

  const hasErrors = () =>
    errors.length > 0;

  return {
    addErrors, getErrors, hasErrors,
  };
};
