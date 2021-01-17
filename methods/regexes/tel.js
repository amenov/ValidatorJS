const lpn = require('libphonenumber-js');

module.exports = ({ data }) => {
  const tel = lpn(data);

  if (tel === undefined || !tel.isValid()) {
    return 'Invalid phone number';
  }
};
