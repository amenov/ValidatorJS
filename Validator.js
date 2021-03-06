class Validator {
  #request
  #rules
  #options
  #errorMessages
  #configRules = require(__dirname + '/config-rules')
  #errorMessagesWrapper = require(__dirname + '/error-messages-wrapper')

  errors = {}

  constructor(request, rules, options) {
    this.#request = request || {}
    this.#rules = rules || {}
    this.#options = { locale: 'en', ...(options || {}) }
    this.#errorMessages = require(__dirname +
      `/error-messages/${this.#options.locale}`)
  }

  get #formattedRules() {
    const formattedRules = []

    for (const key in this.#rules) {
      if (
        key.startsWith('$') ||
        this.#rules[key].__proto__ !== Object.prototype
      )
        continue

      Object.assign(this.#rules, {
        [key]: 'object',
        ['$' + key]: this.#rules[key]
      })
    }

    for (const key in this.#rules) {
      if (
        key.startsWith('$') ||
        !(this.#rules[key] && typeof this.#rules[key] === 'string')
      )
        continue

      const rules = this.#rules[key].split('|').map((rule) => {
        if (rule.includes(':')) {
          const [name, arg] = rule.split(':')

          return { name, arg }
        } else {
          return { name: rule }
        }
      })

      formattedRules.push({ key, rules })
    }

    return formattedRules
  }

  async #ruleHandler(name, options) {
    try {
      const handler = require(__dirname + '/rules/' + this.#configRules[name])

      return await handler(options)
    } catch (err) {
      console.log(err)
    }
  }

  async fails() {
    for (const { key, rules } of this.#formattedRules) {
      for (const rule of rules) {
        const message = await this.#ruleHandler(rule.name, {
          request: this.#request,
          rules: this.#rules,
          options: this.#options,
          requestKey: key,
          requestValue: this.#request[key],
          ruleArg: rule.arg,
          errorMessage: {
            default: this.#errorMessages[rule.name],
            custom: this.#options.errorMessages?.[key]?.[rule.name]
          },
          errorMessagesWrapper: this.#errorMessagesWrapper
        })

        if (message === 'skip') {
          break
        } else if (message) {
          this.errors[key] = message

          break
        }
      }
    }

    return this.failed
  }

  get failed() {
    return !!Object.keys(this.errors).length
  }
}

module.exports = Validator
