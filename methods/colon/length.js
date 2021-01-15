module.exports = ({ data, arg }) => {
  if (data.length !== +arg) {
    return `The string length should be: ${arg}`;
  }
};
