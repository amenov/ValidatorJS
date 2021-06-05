module.exports = ({ request, ruleArg: requestKey, requestValue }) => {
  if (
    (requestKey && request[requestKey] === undefined) ||
    (!requestKey && requestValue === undefined)
  ) {
    return 'skip'
  }
}
