const router = require("express").Router();
const controller = require("../controllers/voyages.controller");

router.post("/", controller.create);
router.get("/", controller.listWithFilters);
router.get("/prochains", controller.getProchains);
router.get("/:id", controller.getByIdWithIncludes);
router.post("/:id/reserver", controller.reserver);

module.exports = router;
