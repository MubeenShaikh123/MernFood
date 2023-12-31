const { validationResult } = require('express-validator');
const { User, Otp } = require('../Model/schema');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const nodemailer = require('nodemailer');

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

// ===========================send Otp====================

exports.sendOtp = async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorResponse = [];
    
    errors.array().forEach((error) => {
      switch (error.msg) {
        case "Invalid Email Format":
          errorResponse.push({ field: "email", message: "Invalid Email Format" });
          break;
          default:
            errorResponse.push({ field: "unknown", message: "Unknown validation error" });
          }
    });

    return res.status(400).json({ error: errorResponse });
  }
  
  const userMail = req.body.email;
  const otp = String(Math.floor(Math.random() * 9000) + 1000);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abc@gmail.com',
      pass: 'fgts okvo bshf kphf',
    },
  });
  const mailOptions = {
    from: 'abc@gmail.com',
    to: userMail,
    subject: 'OTP for your account',
    text: `Your OTP is: ${otp}`,
  };


  // Check if a user with the provided email exists in the database
  User.findOne({ email: userMail })
    .then((existingUser) => {
      if (existingUser) {
        // User exists, continue with OTP operations
        return Otp.findOne({ email: userMail });
      } else {
        // User does not exist, return an error
        return Promise.reject('User not found');
      }
    })
    .then((existingOtp) => {
      if (existingOtp) {
        // OTP exists, update it
        existingOtp.otp = otp;
        existingOtp.used = false;
        existingOtp.date = new Date();
        return existingOtp.save();
      } else {
        // OTP does not exist, create a new record
        const newOtp = new Otp({
          email: userMail,
          otp: otp,
          used: false,
        });
        return newOtp.save();
      }
    })
    .then(() => {
      // Send the email
      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      });
    })
    .then((info) => {
      res.json({ message: 'OTP Sent Successfully' });
    })
    .catch((error) => {
      if (error === 'User not found') {
        res.status(404).json({ error: [{ message: 'User not found' }] });
      } else {
        res.status(406).json({ error: [{ message: 'Error sending OTP' }] });
      }
    });
};

// ====================================send Otp to unregistered users ============================

exports.sendOtpUnregistered = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorResponse = [];

    errors.array().forEach((error) => {
      switch (error.msg) {
        case "Invalid Email Format":
          errorResponse.push({ field: "email", message: "Invalid Email Format" });
          break;
        default:
          errorResponse.push({ field: "unknown", message: "Unknown validation error" });
      }
    });

    return res.status(400).json({ error: errorResponse });
  }

  const userMail = req.body.email;
  const otp = String(Math.floor(Math.random() * 9000) + 1000);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: 'MernFood@gmail.com',
    to: userMail,
    subject: 'OTP for your account',
    text: `Your OTP is: ${otp}`,
  };

  // Check if an OTP with the provided email exists in the database
  Otp.findOne({ email: userMail })
    .then((existingOtp) => {
      if (existingOtp) {
        // OTP exists, update it
        existingOtp.otp = otp;
        existingOtp.used = false;
        existingOtp.date = new Date();
        return existingOtp.save();
      } else {
        // OTP does not exist, create a new record
        const newOtp = new Otp({
          email: userMail,
          otp: otp,
          used: false,
        });
        return newOtp.save();
      }
    })
    .then(() => {
      // Send the email
      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      });
    })
    .then((info) => {
      res.json({ message: 'OTP Sent Successfully' });
    })
    .catch((error) => {
      res.status(406).json({ error: [{ message: 'Error sending OTP' }] });
    });
};

// ====================================verify Otp============================

exports.verifyOtp = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorResponse = [];

    errors.array().forEach((error) => {
      switch (error.msg) {
        case 'Invalid Email Format':
          errorResponse.push({ field: 'email', message: error.msg });
          break;
        case 'Invalid OTP Format':
          errorResponse.push({ field: 'otp', message: error.msg });
          break;
        default:
          errorResponse.push({ field: 'unknown', message: 'Unknown validation error' });
      }
    });

    return res.status(400).json({ error: errorResponse });
  }

  const { email, otp } = req.body;
  Otp.findOne({ email })
    .then((otpDocument) => {
      if (otpDocument && !otpDocument.used && otpDocument.date >= new Date(Date.now() - 5 * 60 * 1000) && otpDocument.otp === otp) {
        // OTP is valid, mark it as used
        otpDocument.used = true;
        return otpDocument.save();
      } else {
        return Promise.reject('Invalid or expired OTP');
      }
    })
    .then(() => {
      // Send a success response
      res.json({ message: 'OTP Verified Successfully' });
    })
    .catch((error) => {
      if (error === 'Invalid or expired OTP') {
        res.status(400).json({ error: [{ message: error }] });
      } else {
        res.status(500).json({ error: [{ message: 'Error verifying OTP' }] });
      }
    });
}

exports.changePassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorResponse = [];

    errors.array().forEach((error) => {
      switch (error.msg) {
        case 'Invalid email format':
          errorResponse.push({ field: 'email', message: 'Invalid email format' });
          break;
        case 'Password must be at least 8 characters long':
          errorResponse.push({ field: 'password', message: 'Password is too short' });
          break;
        default:
          errorResponse.push({ field: 'unknown', message: 'Unknown validation error' });
          break;
      }
    });

    return res.status(400).json({ error: errorResponse });
  }

  // Check if the new password and confirm password match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: [{ msg: 'Password and Confirm Password do not match' }] });
  }

  const hashpass = await bcryptjs.hashSync(password)
  // Find the user by their email
  await User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject('User not found');
      }
      // Hash the new passwordconst hashpass = await bcryptjs.hashSync(password)
      return (hashpass);
    })
    .then((hashedPassword) => {
      // Update the user's password
      return User.findOneAndUpdate({ email }, { password: hashedPassword });
    })
    .then(() => {
      res.json({ message: 'Password changed successfully' });
    })
    .catch((error) => {
      if (error === 'User not found') {
        res.status(404).json({ error: [{ message: 'User not found' }] });
      } else {
        res.status(500).json({ error: [{ message: 'Error changing password' }] });
      }
    });



}



// =================================================================================
// =================================================================================

