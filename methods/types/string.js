module.exports = ({ data }) => {
  if (typeof data !== 'string') {
    return 'This field must be a "string"';
  }
};
