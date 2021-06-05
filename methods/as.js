module.exports = ({ request, requestKey, requestValue, ruleArg }) => {
  if (requestValue !== request[ruleArg]) {
    return `The value of the field "${requestKey}" does not match the value of the field "${ruleArg}"`
  }
}
