export const errorsByFields = (errorStrings) =>
  errorStrings
    .map((errorString) => {
      const [field, error] = errorString.split(':');

      return { field, error };
    })
    .reduce(
      (acc, { field, error }) => {
        const useField = error ? field : 'formErrors';
        const useError = error || field;

        if (!(useField in acc)) {
          acc[useField] = [];
        }
        acc[useField].push(useError);

        return acc;
      },
      {},
    );
