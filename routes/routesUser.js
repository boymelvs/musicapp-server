const express = require("express");
const router = express.Router();
const controllerLogin = require("../controllers/controllerLogin");
const controllerSignup = require("../controllers/controllerSignup");
const controllerEditProfile = require("../controllers/controllerEditProfile");
const controllertUserDelete = require("../controllers/controllerUserDelete");

router.post("/login", controllerLogin.login);
router.post("/signup", controllerSignup.signup);

router.post("/profile", controllerEditProfile.update);
router.delete("/delete/:id", controllertUserDelete.delete);

module.exports = router;
