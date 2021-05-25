module.exports = ({ requestValue: arr, ruleArg: type }) => {
  if (!Array.isArray(arr)) {
    return 'This field must be a "array"';
  }

  const availableTypes = ['string', 'boolean', 'number', 'array', 'object'];

  if (type) {
    if (!availableTypes.includes(type)) {
      return 'The type you specified was not found in the list of available types.';
    }

    for (const item of arr) {
      if (
        (type === 'object' && item.__proto__ !== Object.prototype) ||
        (type === 'array' && !Array.isArray(item)) ||
        typeof item !== type
      ) {
        return `Array element must be of type "${type}"`;
      }
    }
  }
};
