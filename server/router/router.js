const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const controller = require('../controller/controller');

router.post('/register', [
    body('name').isLength({ min: 4 }).withMessage('Name must be at least 4 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], controller.register);

router.post('/login', [
    body('email').isEmail().withMessage("Email Format Error"),
    body('password').isLength({min:8}).withMessage("Password must be at least 8 characters long")
], controller.login)

// ===============Routers to get food category and food data========
router.get('/foodCategory',controller.foodCategory)
router.get('/foodItem',controller.fooditem)

module.exports = router;
