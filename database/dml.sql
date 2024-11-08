-- Insert into Applicant
INSERT INTO Applicant (name, email, phone_number, location, year_of_experience)
VALUES ('John Doe', 'john.doe@example.com', '123-456-7890', 'New York', 5);

-- Insert into Role
INSERT INTO Role (role_name)
VALUES ('Software Engineer');

-- Insert into Application
INSERT INTO Application (applicants_id, role_id, resume_link, status)
VALUES (1, 1, 'http://example.com/resume/johndoe', 'Pending');
