module.exports = ({ requestValue: value, ruleArg }) => {
  const [leftNum, rightNum] = ruleArg.split('-');

  if (
    typeof value !== 'string' &&
    typeof value !== 'number' &&
    !Array.isArray(value)
  ) {
    return 'Between[TypeError]: Type can only be string, number, array';
  }

  if (
    !(
      (typeof value === 'string' && value.length >= leftNum) ||
      (typeof value === 'number' && value >= leftNum) ||
      (Array.isArray(value) && value.length >= leftNum)
    )
  ) {
    return `Minimum: ${leftNum}`;
  }

  if (
    !(
      (typeof value === 'string' && value.length <= rightNum) ||
      (typeof value === 'number' && value <= rightNum) ||
      (Array.isArray(value) && value.length <= rightNum)
    )
  ) {
    return `Maximum: ${rightNum}`;
  }
};
