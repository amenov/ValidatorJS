module.exports = async ({ arg, field, data, options: { sequelize } }) => {
  if (sequelize) {
    const [table, tableColumn] = arg.split('-');

    try {
      const [result] = await sequelize.query(
        `SELECT * FROM ${table} WHERE ${
          tableColumn ? tableColumn : field
        } = "${data}"`
      );

      if (result[0]) {
        return 'The value for this field must be unique';
      }
    } catch (err) {
      console.log(err);
    }
  }
};
