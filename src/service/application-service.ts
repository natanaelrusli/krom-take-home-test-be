import pool from "../database/pool";
import { Application, GetApplicationRequest, mapRowToApplication } from "../model/application-model";

export class ApplicationService {
  static async getAllApplications(
    request: GetApplicationRequest
  ): Promise<Application[]> {
    let getAllQuery = `
      SELECT 
        a.id, a.resume_link, a.status, a.created_time AS app_created_time, a.updated_time AS app_updated_time,
        app.id AS applicant_id, app.name AS applicant_name, app.email, app.phone_number, app.location_id, l.location_name, app.profile_image, app.year_of_experience,
        app.created_time AS applicant_created_time, app.updated_time AS applicant_updated_time,
        r.id AS role_id, r.role_name, r.created_time AS role_created_time, r.updated_time AS role_updated_time
      FROM Application a
      JOIN Applicant app ON a.applicants_id = app.id
      JOIN Role r ON a.role_id = r.id
	  JOIN Location l ON app.location_id = l.id
    `;

    const { rows } = await pool.query(getAllQuery);

    return rows.map(mapRowToApplication);
  }
}
