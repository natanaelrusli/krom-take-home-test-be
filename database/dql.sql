SELECT * FROM Applicant;

SELECT * FROM Role;

SELECT * FROM Application;

SELECT 
    a.name AS applicant_name,
    r.role_name,
    ap.status
FROM 
    Application ap
JOIN 
    Applicant a ON ap.applicants_id = a.id
JOIN 

-- Insert a new application if it doesn't exist for the given applicant email and role ID
INSERT INTO Application (applicants_id, role_id, resume_link, status)
SELECT a.id, 1, 'http://example.com/resume.pdf', 'Pending'
FROM Applicant a
WHERE a.email = 'john.doe@example.com'
  AND NOT EXISTS (
    SELECT 1
    FROM Application app
    WHERE app.applicants_id = a.id
      AND app.role_id = 1
  );

