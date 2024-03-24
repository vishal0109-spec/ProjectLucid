const createErrors = (status, message, success) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  err.success = success;
  return err;
};
export default createErrors;
