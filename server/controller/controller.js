const { validationResult } = require('express-validator')
const User = require('../Model/schema');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

exports.register = async (req, res) => { // Use register instead of registery
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorResponse = [];

        // Customize responses based on specific error messages
        errors.array().forEach(error => {
            switch (error.msg) {
                case 'Name must be at least 4 characters long':
                    errorResponse.push({ field: 'name', message: 'Username is too short' });
                    break;
                case 'Invalid email format':
                    errorResponse.push({ field: 'email', message: 'Invalid email format' });
                    break;
                case 'Password must be at least 8 characters long':
                    errorResponse.push({ field: 'password', message: 'Password is too short' });
                    break;
                // Add more cases for other validation messages as needed
                default:
                    errorResponse.push({ field: 'unknown', message: 'Unknown validation error' });
                    break;
            }
        });

        return res.status(400).json({ error: errorResponse });
    }

    if (!req.body) {
        return res.status(400).json({ error: [{ message: 'All fields are mandatory' }] })
    }
    const { email, password, name, location } = req.body

    try {

        const existingUser = await User.findOne({ email: req.body.email })

        if (existingUser) {
            return res.status(409).json({ error: [{ message: "User with given email already exist" }] })
        }
        const hashpass = await bcryptjs.hashSync(password)
        const newUser = new User({
            name: name,
            email: email,
            password: hashpass,
            location: location
        });

        newUser
            .save()
            .then(register => {
                res.json({ email: register.email, name: register.name });
            })
            .catch(error => {
                res.status(406).json({ error: [{ message: error.message || "Something Went Wong In Mongodb" }] });
            });
    } catch (err) {
        res.status(500).json({ error: [{ message: err.message || "Error in login" }] });
    }
}


exports.login = async (req, res) => {
    const { email, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors.array());
        const errorResponse = []

        errors.array().forEach(error => {
            switch (error.msg) {
                case "Email Format Error":
                    errorResponse.push({ field: "email", message: "Invalid email format" })
                    break;
                case "Password must be at least 8 characters long":
                    errorResponse.push({ field: 'password', message: 'Password is too short' });
                    break;

                default:
                    errorResponse.push({ field: 'unknown', message: 'Unknown validation error' });
                    break;
            }
        })
        return res.status(400).json({ error: errorResponse });
    }
    const document = await User.findOne({ email: email });

    if (!document) {
        return res.status(401).json({ error: [{ message: "Invalid email" }] });
    }

    const isMatch = await bcryptjs.compare(password, document.password)
    if (!isMatch) {
        return res.status(400).json({ error: [{ message: 'Incorrect password' }] })
    }
    const token = jwt.sign({ id: document._id }, process.env.JWT)
    const name = document.name
    return res.json({ token, email, name })

}

exports.foodCategory = async (req, res) => {
    try {
        const collection = mongoose.connection.collection('foodCategory')

        const data = await collection.find({}).toArray()
        return res.json(data)
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.fooditem = async (req, res) => {
    try {
        const collection = mongoose.connection.collection('food_items')

        const data = await collection.find({}).toArray()
        return res.json(data)
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}