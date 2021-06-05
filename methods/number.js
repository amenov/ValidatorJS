module.exports = ({ requestValue }) => {
  if (typeof requestValue !== 'number') {
    return 'This field must be a "number"'
  }
}
