CREATE  TABLE IF NOT EXISTS Feedback (
    Feedback_ID INT AUTO_INCREMENT PRIMARY KEY,
    Feedback_desc VARCHAR(255),
    Rating INT,
    User_ID INT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID)
);