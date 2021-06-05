module.exports = class Validator {
  constructor(request, rules, options = {}) {
    this.request = request
    this.rules = rules
    this.options = options
  }

  errors = {}

  get #formattedRules() {
    const formattedRules = []

    for (const key in this.rules) {
      if (!key.startsWith('$')) {
        const value = this.rules[key]

        if (value.__proto__ === Object.prototype) {
          Object.assign(this.rules, {
            [key]: 'object',
            ['$' + key]: value
          })
        }
      }
    }

    for (const key in this.rules) {
      if (!key.startsWith('$')) {
        const value = this.rules[key]

        if (value && typeof value === 'string') {
          const rules = []

          for (const rule of value.split('|')) {
            const obj = {}

            if (rule.includes(':')) {
              const [name, arg] = rule.split(':')

              obj['name'] = name
              obj['arg'] = arg
            } else {
              obj['name'] = rule
            }

            rules.push(obj)
          }

          formattedRules.push({ key, rules })
        }
      }
    }

    return formattedRules
  }

  get failed() {
    return !!Object.keys(this.errors).length
  }

  #getRuleHandler(name) {
    const methods = require('./methods.json')
    const handler = require('./methods/' + methods[name])

    return handler
  }

  async fails() {
    for (const { key, rules } of this.#formattedRules) {
      for (const rule of rules) {
        try {
          const ruleHandler = this.#getRuleHandler(rule.name)

          const message = await ruleHandler({
            request: this.request,
            requestKey: key,
            requestValue: this.request[key],
            ruleArg: rule.arg,
            options: this.options,
            rules: this.rules
          })

          if (message === 'skip') {
            break
          } else if (message) {
            this.errors[key] = message

            break
          }
        } catch (err) {
          console.log(err)
        }
      }
    }

    return this.failed
  }
}
