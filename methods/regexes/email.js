module.exports = ({ requestValue: value }) => {
  if (
    typeof value !== 'string' ||
    value.trim() === '' ||
    !value.match(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )
  ) {
    return 'Invalid email';
  }
};
