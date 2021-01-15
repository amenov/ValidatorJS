const Validator = require('./Validator');

(async () => {
  const data = [
    undefined,
    null,
    '',
    ' ',
    'test',
    'a.amenov@a2r.kz',
    false,
    true,
    0,
    1,
    2,
    [],
    [1],
  ];

  const rules = [
    'required',
    'array',
    'boolean',
    'number',
    'string',
    'ifThereIs',
    'allowEmpty',
    'allowFalse',
    'allowNull',
    'allowZero',
    'ifExists',
    'email',
    'between:1-2',
    'min:2',
    'max:1',
  ];

  for (const rule of rules) {
    for (const item of data) {
      const request = { [rule]: item };
      const rules = { [rule]: rule };

      const validation = new Validator(request, rules);

      await validation.fails();

      const failed = validation.failed;

      console.log('rule:', rule);
      console.log('request:', item);
      console.log('failed:', failed);

      if (failed) {
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        console.log('| errors:', validation.errors);
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      }

      console.log();
    }
  }
})();
