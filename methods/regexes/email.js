module.exports = ({ data }) => {
  if (
    typeof data !== 'string' ||
    data.trim() === '' ||
    !data.match(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )
  ) {
    return 'Invalid email';
  }
};
