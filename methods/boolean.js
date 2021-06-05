module.exports = ({ requestValue }) => {
  if (typeof requestValue !== 'boolean') {
    return 'This field must be a "boolean"'
  }
}
