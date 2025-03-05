CREATE  TABLE IF NOT EXISTS Feedback (
    Feedback_ID INT AUTO_INCREMENT PRIMARY KEY,
    Feedback_desc VARCHAR(255),
    Rating INT,
    user_ID INT,
    FOREIGN KEY (user_ID) REFERENCES users(user_ID)
);