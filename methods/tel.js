const lpn = require('libphonenumber-js')

module.exports = ({ requestValue, ruleArg: countryCode }) => {
  if (typeof requestValue !== 'string') {
    return 'This field must be a "string"'
  }

  const tel = lpn(requestValue)

  if (tel === undefined || !tel.isValid()) {
    return 'Invalid phone number'
  }

  if (countryCode && tel.country !== countryCode) {
    return 'Invalid country code'
  }
}
