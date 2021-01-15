const methods = require('./methods.json');

module.exports = class Validator {
  constructor(request, rules, options) {
    this.request = request;
    this.rules = rules;
    this.options = options;
  }

  errors = {};

  get formattedRules() {
    const formattedRules = [];

    for (const field in this.rules) {
      const fieldValue = this.rules[field];

      if (fieldValue && typeof fieldValue === 'string') {
        const splitRules = fieldValue.split('|');

        const rules = [];

        for (const rule of splitRules) {
          if (rule.includes(':')) {
            const [name, arg] = rule.split(':');

            rules.push({ name, arg });
          } else {
            rules.push({ name: rule });
          }
        }

        formattedRules.push({ field, rules });
      }
    }

    return formattedRules;
  }

  get failed() {
    return !!Object.keys(this.errors).length;
  }

  getRuleHandler(ruleName) {
    const handler = require('./methods/' + methods[ruleName]);

    return handler;
  }

  async fails() {
    for (const { field, rules } of this.formattedRules) {
      for (const rule of rules) {
        try {
          const ruleHandler = this.getRuleHandler(rule.name);

          const message = await ruleHandler({
            request: this.request,
            field,
            data: this.request[field],
            arg: rule.arg,
            options: this.options,
          });

          if (message === 'skip') {
            break;
          } else if (message) {
            this.errors[field] = message;

            break;
          }
        } catch (err) {
          console.log(err);
        }
      }
    }

    return this.failed;
  }
};
