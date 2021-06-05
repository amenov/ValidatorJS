module.exports = ({ requestValue: value, ruleArg: num }) => {
  if (
    typeof value !== 'string' &&
    typeof value !== 'number' &&
    !Array.isArray(value)
  ) {
    return 'Max[TypeError]: Type can only be string, number, array'
  }

  if (
    !(
      (typeof value === 'string' && value.length <= num) ||
      (typeof value === 'number' && value <= num) ||
      (Array.isArray(value) && value.length <= num)
    )
  ) {
    return `Maximum: ${num}`
  }
}
