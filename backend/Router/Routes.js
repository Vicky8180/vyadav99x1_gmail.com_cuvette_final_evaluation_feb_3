const express = require("express");
const router = express.Router();

const { Register, Login ,searchUsers} = require("../Controller/Auth_controller");


router.post("/auth/register", Register);
router.post("/auth/login", Login);
router.get("/search", searchUsers);





module.exports = router;