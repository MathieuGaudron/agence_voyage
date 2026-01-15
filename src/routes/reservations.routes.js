const router = require("express").Router();
const controller = require("../controllers/reservations.controller");

router.post("/", controller.create);
router.get("/client/:clientId", controller.listByClient);
router.get("/voyage/:voyageId", controller.listByVoyage);
router.put("/:id/annuler", controller.annuler);

module.exports = router;
