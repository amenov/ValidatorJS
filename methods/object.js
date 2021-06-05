const Validator = require(__dirname + '/Validator')

module.exports = async ({ rules, requestKey, requestValue, options }) => {
  if (requestValue?.__proto__ !== Object.prototype) {
    return 'This field must be a "object"'
  }

  const validationRules = rules['$' + requestKey]

  if (validationRules) {
    const validation = new Validator(requestValue, validationRules, options)

    await validation.fails()

    if (validation.failed) {
      return validation.errors
    }
  }
}
