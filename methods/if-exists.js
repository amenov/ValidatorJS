module.exports = ({ request, ruleArg: requestKey, requestValue }) => {
  if (
    (requestKey && request[requestKey] === undefined) ||
    requestValue === undefined
  ) {
    return 'skip'
  }
}
