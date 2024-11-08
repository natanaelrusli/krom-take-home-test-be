-- Insert into Applicant
INSERT INTO Applicant (name, email, phone_number, location_id, profile_image, year_of_experience)
VALUES ('John Doe', 'john.doe@example.com', '123-456-7890', 1, 'https://avatars.githubusercontent.com/u/124599?v=4', 5);

-- Insert into Role
INSERT INTO Role (role_name)
VALUES ('Software Engineer');

INSERT INTO Role (role_name)
VALUES ('Senior Software Engineer');

-- Insert into Application
INSERT INTO Application (applicants_id, role_id, resume_link, status)
VALUES (1, 1, 'http://example.com/resume/johndoe', 'Pending');

-- Insert into Location
INSERT INTO Application (location_name)
VALUES ('Indonesia');
