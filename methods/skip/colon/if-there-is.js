module.exports = ({ request, ruleArg: requestKey }) => {
  if (request[requestKey] === undefined) {
    return 'skip';
  }
};
