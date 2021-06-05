module.exports = ({ requestValue }) => {
  if (
    requestValue?.__proto__ === Object.prototype &&
    !Object.keys(requestValue).length
  ) {
    return 'skip'
  }
}
