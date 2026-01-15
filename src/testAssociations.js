const db = require("../models");

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ DB connected");
    console.log("Models:", Object.keys(db).filter(k => !["sequelize","Sequelize"].includes(k)));
    process.exit(0);
  } catch (e) {
    console.error("❌", e);
    process.exit(1);
  }
})();
