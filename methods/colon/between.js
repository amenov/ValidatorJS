module.exports = ({ data, arg }) => {
  const [leftOperand, rightOperand] = arg.split('-');

  if (typeof data !== 'string' || typeof data !== 'number') {
    return 'Between[TypeError]: Type can only be string, number, array';
  }

  const leftOperandConditions = [
    'typeof data === "string" && data.length >= leftOperand',
    'typeof data === "number" && data >= leftOperand',
    'Array.isArray(data) && data.length >= leftOperand',
  ];

  const rightOperandConditions = [
    'typeof data === "string" && data.length <= rightOperand',
    'typeof data === "number" && data <= rightOperand',
    'Array.isArray(data) && data.length <= rightOperand',
  ];

  const check = (conditions) => !eval(conditions.join('||'));

  if (check(leftOperandConditions)) {
    return `Minimum: ${leftOperand}`;
  }

  if (check(rightOperandConditions)) {
    return `Maximum: ${rightOperand}`;
  }
};
