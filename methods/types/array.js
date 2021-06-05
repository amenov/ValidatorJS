const Validator = require(__dirname + '/../../Validator')

module.exports = async ({
  rules,
  requestKey,
  requestValue: arr,
  ruleArg: type,
  options
}) => {
  if (!Array.isArray(arr)) {
    return 'This field must be a "array"'
  }

  const availableTypes = ['string', 'boolean', 'number', 'array', 'object']

  if (type) {
    if (!availableTypes.includes(type)) {
      return 'The type you specified was not found in the list of available types.'
    }

    let index = 0

    for (const item of arr) {
      if (
        (type === 'object' && item.__proto__ !== Object.prototype) ||
        (type === 'array' && !Array.isArray(item)) ||
        (typeof item !== type && type !== 'object' && type !== 'array')
      ) {
        return {
          message: `Array element must be of type "${type}"`,
          index
        }
      }

      const validationRules = rules['$' + requestKey + ':' + type]

      if (validationRules) {
        if (type === 'array') {
          let elementIndex = 0

          for (const element of item) {
            const validation = new Validator(
              { message: element },
              { message: validationRules },
              options
            )

            await validation.fails()

            if (validation.failed) {
              validation.errors.index = index
              validation.errors.elementIndex = elementIndex

              return validation.errors
            }

            elementIndex++
          }
        } else {
          const validation = new Validator(
            type === 'object' ? item : { message: item },
            type === 'object' ? validationRules : { message: validationRules },
            options
          )

          await validation.fails()

          if (validation.failed) {
            validation.errors.index = index

            return validation.errors
          }
        }
      }

      index++
    }
  }
}
