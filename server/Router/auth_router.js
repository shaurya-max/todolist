const express = require('express');
const authController = require('../Controler/auth_controler');
const authMiddleware = require('../Middlewere/auth_middlewere'); // Ensure the correct path

const router = express.Router();

router.route("/")
  .get(authController.home);

router.route("/login")
  .post(authController.login);

router.route("/register")
  .post(authController.register);

router.route("/services")
  .get(authController.services);

router.route("/Todolist")
  .post(authController.Todolist);

router.route("/user")
  .post(authMiddleware, authController.user); // Use the correct method from the controller

module.exports = router;
