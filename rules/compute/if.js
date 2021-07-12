module.exports = ({ request, ruleArg }) => {
  const operators = [
    ['>=', (left, right) => left >= right],
    ['>', (left, right) => left > right],

    ['<=', (left, right) => left <= right],
    ['<', (left, right) => left < right],

    ['!==', (left, right) => left !== right],
    ['!=', (left, right) => left != right],

    ['===', (left, right) => left === right],
    ['==', (left, right) => left == right]
  ]

  for (const [operator, handler] of operators) {
    if (ruleArg.includes(operator)) {
      const [key, value] = ruleArg.split(operator)

      const result = handler(request[key], eval(value))

      if (!result) return 'skip'

      break
    }
  }
}
