# Krom Take Home Test BE

## Endpoints

### Get All Applications

Endpoint: POST /api/applications

Request Body:

```json
{
  "location": "Indonesia",
  "job_role_id": 12,
  "status_id": 13,
  "filter_keyword": "",
  "curPage": 1,
}
```

Response:
```json
{
  "message": "ok",
  "data": [
    {
      "application_id": 1,
      "candidate_name": "Ethan",
      "candidate_email": "ethan.robinson@email.com",
      "role": "System Architect",
      "application_status": "Candidate Rejected"
    }
  ]
}
```

### Get Application Details

Endpoint: POST /api/application_detail

Request Body:

```json
{
  "application_id": 1,
}
```

Response:
```json
{
  "message": "ok",
  "data": {
    "application_id": 1,
    "candidate_name": "Ethan",
    "candidate_email": "ethan.robinson@email.com",
    "candidate_phone_number": "0987635463",
    "years_of_experience": 6,
    "role": "System Architect",
    "location": "South Africa",
    "resume_url": "http://resume.com",
    "application_status": "Candidate Rejected"
  }
}
```

### Create New Application
