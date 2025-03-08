CREATE TABLE IF NOT EXISTS Event_Participants (
    registration_id INT NOT NULL,
    participant_id INT NOT NULL,
    PRIMARY KEY (registration_id, participant_id),
    FOREIGN KEY (registration_id) REFERENCES Event_Registration(registration_id) ON DELETE CASCADE,
    FOREIGN KEY (participant_id) REFERENCES users(user_id) ON DELETE CASCADE
);