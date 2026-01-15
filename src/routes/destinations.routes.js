const router = require("express").Router();
const controller = require("../controllers/destinations.controller");

router.post("/", controller.create);
router.get("/", controller.list);
router.get("/:id", controller.getByIdWithIncludes);
router.get("/:id/voyages", controller.getVoyagesByDestination);
router.get("/continent/:continent", controller.getByContinent);


module.exports = router;
