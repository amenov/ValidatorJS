const Validator = require('./Validator');

const request = {
  name: 'Abdulsalam',
  age: 22,

  object: {},
  boolean: false,

  email: 'test@test.test',
  tel: '+77075733900',

  minNum: 5,
  minStr: 'Hello',
  minArr: [1, 2, 3],

  maxNum: 5,
  maxStr: 'Hello',
  maxArr: [1, 2, 3],

  betweenNum: 5,
  betweenStr: 'Hello',
  betweenArr: ['1', '2', '3'],
};

const rules = {
  name: 'required|string',
  age: 'required|number',

  object: 'object',
  boolean: 'required|boolean',

  email: 'required|email',
  tel: 'required|tel:KZ',

  minNum: 'number|min:5',
  minStr: 'string|min:5',
  minArr: 'array:number|min:3',

  maxNum: 'number|max:5',
  maxStr: 'string|max:5',
  maxArr: 'array:number|max:3',

  betweenNum: 'number|between:1-5',
  betweenStr: 'string|between:1-5',
  betweenArr: 'array:string|between:1-3',
};

const validation = new Validator(request, rules);

(async () => {
  await validation.fails();

  if (validation.failed) {
    console.log(validation.errors);
  }
})();
