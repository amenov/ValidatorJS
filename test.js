const Validator = require(__dirname + '/Validator')

const request = {}

const rules = {}

const options = {
  locale: 'ru', // en || ru
  errorMessage: {}
}

const validation = new Validator(request, rules, options)

;(async () => {
  await validation.fails()

  if (validation.failed) {
    console.log(validation.errors)
  }
})()
