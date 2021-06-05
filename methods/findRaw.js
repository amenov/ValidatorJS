module.exports = async ({ ruleArg: query, options: { sequelize } }) => {
  if (sequelize) {
    try {
      const [result] = await sequelize.query(query)

      if (!result[0]) {
        return `Not found`
      }
    } catch (err) {
      console.log(err)
    }
  }
}
