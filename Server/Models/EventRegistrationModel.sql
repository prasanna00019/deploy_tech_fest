CREATE TABLE Event_Registration (
  Registration_ID INT PRIMARY KEY,
  Event_ID INT,
  Registrant_ID INT,
  Admin_accepted BOOLEAN DEFAULT FALSE,
  Participants_ID ARRAY[5] INT,
  Payment_ID INT,
  FOREIGN KEY (Payment_ID) REFERENCES Payment(Payment_ID)
);

CREATE INDEX idx_Event_ID ON Event_Registration (Event_ID);
CREATE INDEX idx_Registrant_ID ON Event_Registration (Registrant_ID);
CREATE INDEX idx_Payment_ID ON Event_Registration (Payment_ID);