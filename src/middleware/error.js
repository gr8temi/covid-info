import isPromise from "../utils/isPromise";
import handleError from "../utils/handleError";

export default function errorMiddleware() {
  return next => action => {
    let result = next(action);
    if (!isPromise(result)) {
      return action;
    }
    return result.catch(error => {
      handleError(error);
      return error;
    });
  };
}
