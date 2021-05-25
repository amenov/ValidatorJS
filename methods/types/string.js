module.exports = ({ requestValue }) => {
  if (typeof requestValue !== 'string') {
    return 'This field must be a "string"';
  }
};
