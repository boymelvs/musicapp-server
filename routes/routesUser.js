const express = require("express");
const router = express.Router();
const controllerLogin = require("../controllers/controllerLogin");
const controllerSignup = require("../controllers/controllerSignup");
const controllerEditProfile = require("../controllers/controllerEditProfile");

router.post("/login", controllerLogin.login);
router.post("/signup", controllerSignup.signup);

router.post("/profile", controllerEditProfile.update);

module.exports = router;
