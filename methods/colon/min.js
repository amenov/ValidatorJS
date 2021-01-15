module.exports = ({ data, arg }) => {
  if (typeof data !== 'string' || typeof data !== 'number') {
    return 'Min[TypeError]: Type can only be string, number, array';
  }

  const conditions = [
    'typeof data === "string" && data.length >= arg',
    'typeof data === "number" && data >= arg',
    'Array.isArray(data) && data.length >= arg',
  ];

  if (!eval(conditions.join('||'))) {
    return `Minimum: ${arg}`;
  }
};
