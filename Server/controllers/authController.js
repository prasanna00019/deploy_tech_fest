import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "../db.js";
import nodemailer from "nodemailer";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
// Register a new user
export const register = async (req, res) => {
    try {
      const { userName, password, fullName, email, phone, collegeName, userPhotoLink, participatedEventId } = req.body;
      
      // Validate required fields
      if (!userName || !password || !fullName || !email) {
        return res.status(400).json({ error: 'Username, password, full name, and email are required' });
      }
      
      // Check if user already exists
      db.query('SELECT * FROM users WHERE user_name = ? OR email = ?', [userName, email], async (err, results) => {
        if (err) {
          console.error('Error checking existing user:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        
        if (results.length > 0) {
          return res.status(409).json({ error: 'Username or email already exists' });
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert new user
        const insertQuery = `
          INSERT INTO users 
          (user_name, hashed_password, full_name, email, phone, college_name, user_photo_link, participated_event_id) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        db.query(
          insertQuery, 
          [userName, hashedPassword, fullName, email, phone, collegeName, userPhotoLink, participatedEventId],
          (err, result) => {
            if (err) {
              console.error('Error registering user:', err);
              return res.status(500).json({ error: 'Failed to register user' });
            }
            
            // Generate JWT
            const token = jwt.sign(
              { 
                id: result.insertId, 
                userName: userName,
                email: email 
              }, 
              JWT_SECRET, 
              { expiresIn: '24h' }
            );
            
            res.status(201).json({
              message: 'User registered successfully',
              userId: result.insertId,
              token: token
            });
          }
        );
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
};

// Login
export const login = async (req, res) => {
    try {
      const { userName, password } = req.body;
      
      // Validate input
      if (!userName || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }
      
      // Find user
      db.query('SELECT * FROM users WHERE user_name = ?', [userName], async (err, results) => {
        if (err) {
          console.error('Login error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        
        if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid username' });
        }
        
        const user = results[0];
        
        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.hashed_password);
        
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid password' });
        }
        
        // Generate JWT
        const token = jwt.sign(
          { 
            id: user.user_id, 
            userName: user.user_name,
            email: user.email 
          }, 
          JWT_SECRET, 
          { expiresIn: '24h' }
        );
        
        res.status(200).json({
          message: 'Login successful',
          userId: user.user_id,
          token: token
        });
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendOtp = async (req, res) => {  
  const email = req.body.email;
  const checkEmailQuery = "SELECT email FROM users WHERE email = ?";

  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Database error" });
    } 
    if (result.length > 0) {
      return res.json({ Error: "Email already registered. Please login." });
    } 

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in the database
    const storeOtpQuery = "INSERT INTO otp_store (email, otp) VALUES (?, ?)";
    db.query(storeOtpQuery, [email, otp], (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ Error: "Database error" });
      }

      // Send OTP email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
            <div style="text-align: center;">
              <img src="https://i.imgur.com/CUfYqLm.jpeg" alt="BookMyTrip Logo" style="max-width: 100px; margin-bottom: 20px;">
            </div>
            <h2 style="text-align: center; color: #333;">Verify your email address</h2>
            <p>You need to verify your email address to continue using your account. Enter the following code to verify your email address:</p>
            <h1 style="text-align: center; color: #333;">${otp}</h1>
            <p style="text-align: center; color: #777;">This OTP is valid for 5 minutes.</p>
            <hr>
            <p style="color: #777; font-size: 12px; text-align: center;">
              If you did not request this code, please ignore this email.
            </p>
          </div>
        `,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          return res.json({ Error: "Failed to send OTP" });
        } else {
          console.log('Email sent: ' + info.response);
          return res.json({ status: "success" });
        }
      });
    });
  });
};

export const verifyOtp = async (req, res) => {
  const { email, username, password, otp } = req.body;

  // Check OTP in the database
  const checkOtpQuery = "SELECT otp, created_at FROM otp_store WHERE email = ? ORDER BY created_at DESC LIMIT 1";
  db.query(checkOtpQuery, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Database error" });
    }
    if (result.length === 0 || result[0].otp !== otp) {
      return res.json({ Error: "Invalid OTP" });
    }

    // Check if OTP is expired
    const otpTimestamp = new Date(result[0].created_at);
    const currentTime = new Date();
    const timeDifference = Math.floor((currentTime - otpTimestamp) / 1000); // in seconds

    if (timeDifference > 300) { // 5 minutes = 300 seconds
      return res.json({ Error: "OTP expired" });
    }

    bcrypt.hash(password.toString(), salt, (err, hashedPassword) => {
      if (err) {
        console.log(err);
        return res.json({ Error: "Failed to hash password" });
      }

      const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      const values = [username, email, hashedPassword];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.log(err);
          return res.json({ Error: "Failed to register" });
        } else {
          // Remove OTP from store
          const deleteOtpQuery = "DELETE FROM otp_store WHERE email = ?";
          db.query(deleteOtpQuery, [email], (err, result) => {
            if (err) {
              console.log(err);
            }
          });
          return res.json({ status: "success" });
        }
      });
    });
  });
};

export const resendOtp = async (req, res) => {
  const email = req.body.email;
  const checkEmailQuery = "SELECT email FROM otp_store WHERE email = ?";

  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Database error" });
    }
    if (result.length === 0) {
      return res.json({ Error: "Session Timed Out! Please Register Again." });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Update OTP and created_at in the database
    const updateOtpQuery = "UPDATE otp_store SET otp = ?, created_at = NOW() WHERE email = ?";
    db.query(updateOtpQuery, [otp, email], (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ Error: "Database error" });
      }

      // Send OTP email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your New OTP Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
            <div style="text-align: center;">
              <img src="https://i.imgur.com/CUfYqLm.jpeg" alt="BookMyTrip Logo" style="max-width: 100px; margin-bottom: 20px;">
            </div>
            <h2 style="text-align: center; color: #333;">Verify your email address</h2>
            <p>You need to verify your email address to continue using your account. Enter the following code to verify your email address:</p>
            <h1 style="text-align: center; color: #333;">${otp}</h1>
            <p style="text-align: center; color: #777;">This OTP is valid for 5 minutes.</p>
            <hr>
            <p style="color: #777; font-size: 12px; text-align: center;">
              If you did not request this code, please ignore this email.
            </p>
          </div>
        `,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          return res.json({ Error: "Failed to send OTP" });
        } else {
          console.log('Email sent: ' + info.response);
          return res.json({ status: "success" });
        }
      });
    });
  });
};

