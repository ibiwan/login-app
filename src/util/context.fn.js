export const contextify = (req, fields) => {
  req.context = {
    ...req.context,
    ...fields,
  };
};
