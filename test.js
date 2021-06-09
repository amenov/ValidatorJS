const Validator = require(__dirname + '/Validator')

const request = {
  name: ''
}

const rules = {
  name: 'required'
}

const validation = new Validator(request, rules)

;(async () => {
  await validation.fails()

  if (validation.failed) {
    console.log(validation.errors)
  }
})()
