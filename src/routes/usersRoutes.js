const {Router} = require("express");
const router = Router();
const usersControllers = require("../controllers/usersControllers");

router.get("/usersLogin",usersControllers.login );
router.get("/usersRegister", usersControllers.register);

module.exports = router;