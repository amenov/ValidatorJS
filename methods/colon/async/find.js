module.exports = async ({ ruleArg, requestValue, options: { sequelize } }) => {
  if (sequelize) {
    try {
      const [table, tableColumn] = ruleArg.split('-');

      const [result] = await sequelize.query(
        `SELECT * FROM ${table} WHERE ${tableColumn} = "${requestValue}"`
      );

      if (!result[0]) {
        return `Not found in the table "${table}"`;
      }
    } catch (err) {
      console.log(err);
    }
  }
};
