module.exports = ({ requestValue, ruleArg: length }) => {
  if (requestValue.length !== +length) {
    return `The string length should be: ${length}`;
  }
};
