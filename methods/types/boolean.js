module.exports = ({ data }) => {
  if (typeof data !== 'boolean') {
    return 'This field must be a "boolean"';
  }
};
