module.exports = ({ data, arg, request, field }) => {
  if (data !== request[arg]) {
    return `The value of the field "${field}" does not match the value of the field "${arg}"`;
  }
};
