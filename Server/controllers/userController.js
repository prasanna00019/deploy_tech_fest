import db from "../db.js";

  // Update user profile (protected route)
  export const updateUserProfile = (req, res) => {
    const { fullName, email, phone, collegeName, userPhotoLink, participatedEventId } = req.body;
    
    // Build update query dynamically based on provided fields
    let updateFields = [];
    let queryParams = [];

    if (fullName) {
      updateFields.push('full_name = ?');
      queryParams.push(fullName);
    }
    
    if (email) {
      updateFields.push('email = ?');
      queryParams.push(email);
    }
    
    if (phone !== undefined) {
      updateFields.push('phone = ?');
      queryParams.push(phone);
    }
    
    if (collegeName !== undefined) {
      updateFields.push('college_name = ?');
      queryParams.push(collegeName);
    }
    
    if (userPhotoLink !== undefined) {
      updateFields.push('user_photo_link = ?');
      queryParams.push(userPhotoLink);
    }
    
    if (participatedEventId !== undefined) {
      updateFields.push('participated_event_id = ?');
      queryParams.push(participatedEventId);
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    // Add user_id to params
    queryParams.push(req.user.id);
    
    const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE user_id = ?`;
    
    db.query(updateQuery, queryParams, (err, result) => {
      if (err) {
        console.error('Error updating user profile:', err);
        return res.status(500).json({ error: 'Failed to update profile' });
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json({ message: 'Profile updated successfully' });
    });
  };
  
  // Change password (protected route)
  export const changePassword = async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current password and new password are required' });
      }
      
      // Get current user
      db.query('SELECT hashed_password FROM users WHERE user_id = ?', [req.user.id], async (err, results) => {
        if (err) {
          console.error('Error fetching user:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        
        if (results.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
        
        const user = results[0];
        
        // Verify current password
        const passwordMatch = await bcrypt.compare(currentPassword, user.hashed_password);
        
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Current password is incorrect' });
        }
        
        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Update password
        db.query('UPDATE users SET hashed_password = ? WHERE user_id = ?', [hashedPassword, req.user.id], (err, result) => {
          if (err) {
            console.error('Error updating password:', err);
            return res.status(500).json({ error: 'Failed to update password' });
          }
          
          res.json({ message: 'Password updated successfully' });
        });
      });
    } catch (error) {
      console.error('Password change error:', error);
      res.status(500).json({ error: 'Password change failed' });
    }
  };

  export const getUserById= async (req, res) => {
    const userId = req.params.id;
    db.query('SELECT user_id, user_name, full_name, email, phone, college_name, user_photo_link, participated_event_id, created_at FROM users WHERE user_id = ?', 
      [userId], 
      (err, results) => {
        if (err) {
          console.error('Error fetching user profile:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(results[0]);
      }
    );  
  };

  export const DeleteUserById= async (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM users WHERE user_id = ?', 
      [userId], 
      (err, results) => {
        if (err) {
          console.error('Error fetching user profile:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(results[0]);
      }
    );  
  };

  export const getAllUsers = async(req, res) => {
      db.query('SELECT * FROM users', (err, results) => {
        if (err) {
          console.error('Error fetching user profiles:', err);
          return res.status(404).json({error : "Error fetching results"});
        }
        else if (results.length === 0){
          return res.status(404).json({ error: 'No users are registered. Zero users registrations!' });
        }
        else{
          return res.status(200).json(results);
        } 
      });
  };
