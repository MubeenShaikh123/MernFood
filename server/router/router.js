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
  body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
], controller.login)

// ===============Routers to get food category, food data and storeData========
router.get('/foodCategory', controller.foodCategory)
router.get('/foodItem', controller.fooditem)
router.get('/storeData', controller.storedata)

// ===============Opt Generation route==============================
router.post('/sendOtp', [
  body('email').isEmail().withMessage("Invalid Email Format")
], controller.sendOtp)

router.post('/sendOtpUnregistered', [
  body('email').isEmail().withMessage("Invalid Email Format")
], controller.sendOtpUnregistered);

router.post('/verifyOtp', [
  body('email').isEmail().withMessage('Invalid Email Format'),
  body('otp').isLength({ min: 4, max: 4 }).withMessage('Invalid OTP Format'),
], controller.verifyOtp);

router.post('/changePassword', [
  body('email').isEmail().withMessage('Invalid Email Format'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], controller.changePassword);

router.post('/addmenu', [
  body('username').notEmpty().withMessage('Username is required'),
  body('cartData').isArray().withMessage('Cart data must be an array'),
], controller.addMenu);

router.post('/removemenu', [
  body('username').notEmpty().withMessage('Username is required'),
  body('name').notEmpty().withMessage('Name is required'),
], controller.removeMenu);

router.delete('/checkout/:username', controller.checkout);

module.exports = router;
