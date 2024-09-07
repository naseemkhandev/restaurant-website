const throwError = (status: number, message: string) => {
  const error = new Error() as any;
  error.status = status;
  error.message = message;

  return error;
};

export default throwError;
