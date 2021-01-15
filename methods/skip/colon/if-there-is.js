module.exports = ({ request, arg }) => {
  let dependence = request[arg];

  if (typeof dependence === 'string') {
    dependence = dependence.trim();
  }

  const conditions = [
    'dependence === undefined',
    'dependence === null',
    'dependence === ""',

    'dependence.length === 0',
  ];

  if (eval(conditions.join('||'))) {
    return 'skip';
  }
};
