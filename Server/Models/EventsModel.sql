CREATE TABLE IF NOT EXISTS Events (
    Event_ID INT PRIMARY KEY AUTO_INCREMENT,
    Event_name VARCHAR(255),
    Event_description VARCHAR(255),
    Event_timeline VARCHAR(255), 
    Event_rules VARCHAR(255),
    Event_photo_link VARCHAR(255),
    Event_location VARCHAR(255),
    Event_fees DECIMAL(10, 2),
    Event_coordinator_description VARCHAR(255),
    MaxTeam_Size VARCHAR(255),
    Event_registration_deadline VARCHAR(255)
);