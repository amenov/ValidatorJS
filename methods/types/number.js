module.exports = ({ data }) => {
  if (typeof data !== 'number') {
    return 'This field must be a "number"';
  }
};
