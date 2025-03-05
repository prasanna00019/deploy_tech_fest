import db from "../db.js";

export const postFeedback = async (req, res) => {
    const { feedbackDescription, userId, rating } = req.body;
    
    if (!feedbackDescription || !userId || !rating){
        return res.status(400).json({error : "Description, user ID and rating are mandatory!"});
    }
    
    const insertQuery = `INSERT INTO Feedback (Feedback_desc, Rating, user_ID) VALUES (?, ?, ?)`;
    
    db.query(insertQuery, [feedbackDescription, rating, userId], (err, result) => {
        if(err){
            console.error('Error posting feedback:', err);
            return res.status(500).json({ error: 'Failed to post feedback' });
        }
        
        return res.status(201).json({
            message: 'Feedback posted successfully',
            feedbackId: result.insertId
        });
    });
};

export const getFeedback = async (req, res) => {
    const { userId } = req.query;
    
    let query = 'SELECT * FROM Feedback';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving feedback:', err);
            return res.status(500).json({ error: 'Failed to retrieve feedback' });
        }
        
        return res.status(200).json(results);
    });
};

export const deleteFeedback = async (req, res) => {
    const { feedbackId } = req.params;
    
    if (!feedbackId) {
        return res.status(400).json({ error: 'Feedback ID is required' });
    }
    
    const deleteQuery = 'DELETE FROM Feedback WHERE Feedback_ID = ?';
    
    db.query(deleteQuery, [feedbackId], (err, result) => {
        if (err) {
            console.error('Error deleting feedback:', err);
            return res.status(500).json({ error: 'Failed to delete feedback' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        
        return res.status(200).json({ message: 'Feedback deleted successfully' });
    });
};