const watch = fn => {
  let value = null;
  const peek = () => value;
  const perform = (...args) => {
    try {
      value = fn(...args);
      return value;
    } catch (e) {
      return `Error: ${e.message}`;
    }
  };
  return { peek, perform };
};

export default watch;