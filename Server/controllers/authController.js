import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "../db.js";
import nodemailer from "nodemailer";
import deleteExpiredOtps from "../otpCleaner.js";

dotenv.config();

deleteExpiredOtps();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
// Register a new user
export const register = async (req, res) => {
    try {
      const { userName, password, fullName, email, phone, collegeName, userPhotoLink } = req.body;
      
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
          (user_name, hashed_password, full_name, email, phone, college_name, user_photo_link) 
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        
        db.query(
          insertQuery, 
          [userName, hashedPassword, fullName, email, phone, collegeName, userPhotoLink],
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
      const { email, password } = req.body;
      
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }
      
      // Find user
      db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
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

        const getInitials = (fullName) => {
          return fullName
            .split(' ')
            .map(name => name.charAt(0).toUpperCase())
            .join('');
        };
        
        res.status(200).json({
          message: 'Login successful',
          userId: user.user_id,
          token: token,
          userInitials: getInitials(user.full_name)
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
        subject: 'Verify Your FLUX Registration',
        html: `
          <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; padding: 30px; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); color: #fff; border-radius: 16px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); border: 1px solid rgba(255, 255, 255, 0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://i.imgur.com/3tOCkhX.jpeg" alt="FLUX Logo" style="max-width: 150px; border-radius: 10px; box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);">
            </div>
            
            <h1 style="text-align: center; color: #fff; font-size: 28px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 10px rgba(147, 51, 234, 0.5);">
              Welcome to FLUX 2024
            </h1>
      
            <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 10px; margin: 20px 0; border: 1px solid rgba(147, 51, 234, 0.3);">
              <h2 style="text-align: center; color: #a855f7; margin-bottom: 15px; font-size: 24px;">
                Your Verification Code
              </h2>
              <div style="text-align: center; letter-spacing: 8px; font-size: 36px; font-weight: bold; color: #fff; padding: 15px; background: rgba(147, 51, 234, 0.2); border-radius: 8px; margin: 10px 0;">
                ${otp}
              </div>
              <p style="text-align: center; color: #94a3b8; margin-top: 15px; font-size: 14px;">
                This code will expire in 5 minutes
              </p>
            </div>
      
            <div style="margin-top: 30px; padding: 20px; background: rgba(255, 255, 255, 0.05); border-radius: 10px; text-align: center;">
              <h3 style="color: #a855f7; margin-bottom: 15px; font-size: 18px;">Need Help?</h3>
              <p style="color: #94a3b8; margin-bottom: 5px;">Contact our support team:</p>
              <p style="color: #fff; margin-bottom: 5px;">Email: president.ssenate@iitram.ac.in</p>
              <p style="color: #fff;">📱 +91 9925061044</p>
            </div>
      
            <div style="margin-top: 30px; text-align: center; padding-top: 20px; border-top: 1px solid rgba(147, 51, 234, 0.3);">
              <p style="color: #94a3b8; font-size: 12px;">
                This is an automated message. Please do not reply directly to this email.
              </p>
              <p style="color: #94a3b8; font-size: 12px; margin-top: 5px;">
                FLUX 2024 - IITRAM's Annual Technical Festival
              </p>
            </div>
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
  const { email, otp } = req.body;

  // Check OTP in the database
  const checkOtpQuery = "SELECT otp, created_at FROM otp_store WHERE email = ? ORDER BY created_at DESC LIMIT 1";
  
  db.query(checkOtpQuery, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Error: "Database error" });
    }

    if (result.length === 0 || result[0].otp !== otp) {
      return res.status(400).json({ Error: "Invalid OTP" });
    }

    // Check if OTP is expired (5 minutes = 300 seconds)
    const otpTimestamp = new Date(result[0].created_at);
    const currentTime = new Date();
    const timeDifference = Math.floor((currentTime - otpTimestamp) / 1000);

    if (timeDifference > 300) {
      return res.status(400).json({ Error: "OTP expired" });
    }

    // Remove OTP after successful verification
    const deleteOtpQuery = "DELETE FROM otp_store WHERE email = ?";
    db.query(deleteOtpQuery, [email], (err, deleteResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ Error: "Error cleaning up OTP" });
      }
      return res.status(200).json({ status: "success", message: "OTP verified successfully" });
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
        subject: 'Your New FLUX Verification Code',
        html: `
          <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; padding: 30px; background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 27, 75, 0.8) 100%); color: #fff; border-radius: 16px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); border: 1px solid rgba(255, 255, 255, 0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://i.imgur.com/3tOCkhX.jpeg" alt="FLUX Logo" style="max-width: 150px; border-radius: 10px; box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);">
            </div>
            
            <h1 style="text-align: center; color: #fff; font-size: 28px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 10px rgba(147, 51, 234, 0.3);">
              New Verification Code
            </h1>
      
            <div style="background: rgba(255, 255, 255, 0.03); padding: 20px; border-radius: 10px; margin: 20px 0; border: 1px solid rgba(147, 51, 234, 0.2);">
              <h2 style="text-align: center; color: #a855f7; margin-bottom: 15px; font-size: 24px;">
                Your New Verification Code
              </h2>
              <div style="text-align: center; letter-spacing: 8px; font-size: 36px; font-weight: bold; color: #fff; padding: 15px; background: rgba(147, 51, 234, 0.15); border-radius: 8px; margin: 10px 0;">
                ${otp}
              </div>
              <p style="text-align: center; color: #94a3b8; margin-top: 15px; font-size: 14px;">
                This code will expire in 5 minutes
              </p>
            </div>
      
            <div style="margin-top: 30px; padding: 20px; background: rgba(255, 255, 255, 0.03); border-radius: 10px; text-align: center;">
              <h3 style="color: #a855f7; margin-bottom: 15px; font-size: 18px;">Need Help?</h3>
              <p style="color: #94a3b8; margin-bottom: 5px;">Contact our support team:</p>
              <p style="color: #fff; margin-bottom: 5px;">Email: president.ssenate@iitram.ac.in</p>
              <p style="color: #fff;">📱 +91 9925061044</p>
            </div>
      
            <div style="margin-top: 30px; text-align: center; padding-top: 20px; border-top: 1px solid rgba(147, 51, 234, 0.2);">
              <p style="color: #94a3b8; font-size: 12px;">
                This is an automated message. Please do not reply directly to this email.
              </p>
              <p style="color: #94a3b8; font-size: 12px; margin-top: 5px;">
                FLUX 2024 - IITRAM's Annual Technical Festival
              </p>
            </div>
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

export const verifyAdminPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required'
      });
    }

    // Get the hashed admin password from environment variables
    const hashedAdminPassword = process.env.ADMIN_PASSWORD;

    if (!hashedAdminPassword) {
      console.error('Admin password hash not configured');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error'
      });
    }

    // Compare the provided password with the hashed password
    const isValid = await bcrypt.compare(password, hashedAdminPassword);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin password'
      });
    }

    res.json({
      success: true,
      message: 'Admin verified successfully',
    });

  } catch (error) {
    console.error('Admin verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};