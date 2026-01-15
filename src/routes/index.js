const router = require("express").Router();

router.use("/clients", require("./clients.routes"));
router.use("/destinations", require("./destinations.routes"));
router.use("/voyages", require("./voyages.routes"));
router.use("/reservations", require("./reservations.routes"));



module.exports = router;
