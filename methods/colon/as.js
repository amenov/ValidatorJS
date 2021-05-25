module.exports = ({ requestValue, ruleArg: requestKey, request, key }) => {
  if (requestValue !== request[requestKey]) {
    return `The value of the field "${key}" does not match the value of the field "${requestKey}"`;
  }
};
