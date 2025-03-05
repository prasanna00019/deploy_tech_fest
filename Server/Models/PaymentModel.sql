CREATE TABLE IF NOT EXISTS Payment (
  Payment_ID INT PRIMARY KEY,
  Amount DECIMAL(10, 2),
  Image_link VARCHAR(255),
  Is_Cleared BOOLEAN DEFAULT FALSE,
  Transaction_id VARCHAR(255)
);