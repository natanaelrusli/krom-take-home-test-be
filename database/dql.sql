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
    Role r ON ap.role_id = r.id;
