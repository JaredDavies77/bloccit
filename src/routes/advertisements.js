const express = require("express");
const router = express.Router();

const advController = require("../controllers/advController")

router.get("/advertisements", advController.index);
router.get("/advertisements/new", advController.new);
router.post("/advertisements/create", advController.create);
router.get("/advertisements/:id", advController.show);
router.post("/advertisements/:id/destroy", advController.destroy);
router.get("/advertisements/:id/edit", advController.edit);
router.post("/advertisements/:id/update", advController.update);





module.exports = router;