export default function isPromise(value) {
  if (value && value instanceof Promise) {
    return value && value instanceof Promise;
  }
  return false;
}
