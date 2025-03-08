CREATE TABLE Event_Registration (
  Registration_ID INT AUTO_INCREMENT PRIMARY KEY,
  Event_ID INT,
  Registrant_ID INT,
  Admin_accepted BOOLEAN DEFAULT FALSE,
  Team_Name VARCHAR(255) NULL,
  Team_photoLink VARCHAR(255) NULL,
  Payment_ID INT,
  FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE,
  FOREIGN KEY (Payment_ID) REFERENCES Payment(Payment_ID) ON DELETE SET NULL,
  FOREIGN KEY (Registrant_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_Event_ID ON Event_Registration (Event_ID);
CREATE INDEX idx_Registrant_ID ON Event_Registration (Registrant_ID);
CREATE INDEX idx_Payment_ID ON Event_Registration (Payment_ID);