module.exports = ({ data }) => {
  if (!Array.isArray(data)) {
    return 'This field must be a "array"';
  }
};
