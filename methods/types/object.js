module.exports = ({ requestValue }) => {
  if (requestValue.__proto__ !== Object.prototype) {
    return 'This field must be a "object"';
  }
};
