module.exports = ({ data }) => {
  if (typeof data === 'string') {
    data = data.trim();
  }

  const conditions = [
    'data === undefined',
    'data === null',
    'data === ""',
    'data.length === 0',
  ];

  if (eval(conditions.join('||'))) {
    return 'Required field';
  }
};
