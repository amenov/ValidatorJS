module.exports = ({ requestValue: value }) => {
  if (typeof value === 'string') {
    value = value.trim();
  }

  if (
    value === undefined ||
    value === null ||
    value === '' ||
    value.length === 0 ||
    (value.__proto__ === Object.prototype && !Object.keys(value).length)
  ) {
    return 'Required field';
  }
};
