module.exports = ({
  requestValue: value,
  errorMessage,
  errorMessagesWrapper
}) => {
  if (typeof value === 'string') value = value.trim()

  if (
    value === void 0 ||
    value === null ||
    value.length === 0 ||
    (value.__proto__ === Object.prototype && !Object.keys(value).length)
  )
    return errorMessagesWrapper(errorMessage).emw2()
}
