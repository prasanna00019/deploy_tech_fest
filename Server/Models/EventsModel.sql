CREATE TABLE IF NOT EXISTS Events (
    Event_ID INT PRIMARY KEY,
    Event_name VARCHAR(255),
    Event_description VARCHAR(255),
    Event_date DATE , 
    Event_photo_link VARCHAR(255),
    Event_location VARCHAR(255),
    Event_fees DECIMAL(10, 2),
    Event_coordinator_contact VARCHAR(255),
    format VARCHAR(255),
    participated_user_ids ARRAY[5] INT, 
)