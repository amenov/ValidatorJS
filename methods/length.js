module.exports = ({ requestValue, ruleArg: length }) => {
  if (requestValue.length !== +length) {
    return `The length should be: ${length}`
  }
}
