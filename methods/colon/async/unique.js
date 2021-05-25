module.exports = async ({
  ruleArg,
  key,
  requestValue,
  options: { sequelize },
}) => {
  if (sequelize) {
    const [table, tableColumn] = ruleArg.split('-');

    try {
      const [result] = await sequelize.query(
        `SELECT * FROM ${table} WHERE ${
          tableColumn ? tableColumn : key
        } = "${requestValue}"`
      );

      if (result[0]) {
        return 'The value for this field must be unique';
      }
    } catch (err) {
      console.log(err);
    }
  }
};
