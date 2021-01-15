module.exports = async ({ arg, data, options: { sequelize } }) => {
  if (sequelize) {
    try {
      const [table, tableColumn] = arg.split('-');

      const [result] = await sequelize.query(
        `SELECT * FROM ${table} WHERE ${tableColumn} = "${data}"`
      );

      if (!result[0]) {
        return `Not found in the table "${table}"`;
      }
    } catch (err) {
      console.log(err);
    }
  }
};
