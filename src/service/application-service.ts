import pool from "../database/pool";
import { NotFoundError } from "../errors/not-found-error";
import {
  Application,
  GetApplicationRequest,
  GetSingleApplicationRequest,
  mapRowToApplication,
} from "../model/application-model";

export class ApplicationService {
  static async getAllApplications(
    request: GetApplicationRequest
  ): Promise<Application[]> {
    const {
      curr_page,
      filter_keyword,
      location,
      job_role_id,
      status,
      page_size,
    } = request;

    const offset = (curr_page - 1) * page_size;

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

    const values: unknown[] = [];

    if (filter_keyword) {
      getAllQuery += ` WHERE (app.name ILIKE $${values.length + 1})`;
      values.push(`%${filter_keyword}%`);
    }

    if (location) {
      getAllQuery += ` AND (app.location_id = $${values.length + 1})`;
      values.push(location);
    }

    if (job_role_id) {
      getAllQuery += ` AND (r.id = $${values.length + 1})`;
      values.push(job_role_id);
    }

    if (status) {
      getAllQuery += ` AND (a.status = $${values.length + 1})`;
      values.push(status);
    }

    getAllQuery += ` OFFSET $${values.length + 1} LIMIT $${values.length + 2}`;
    values.push(offset, page_size);

    const { rows } = await pool.query(getAllQuery, values);

    return rows.map(mapRowToApplication);
  }

  static async getSingleApplication(
    request: GetSingleApplicationRequest
  ): Promise<Application> {
    const { application_id } = request;

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

    const values: unknown[] = [];

    if (application_id) {
      getAllQuery += ` WHERE (a.id = $${values.length + 1})`;
      values.push(application_id);
    }

    const { rows } = await pool.query(getAllQuery, values);

    if (rows.length === 0) {
      throw new NotFoundError(
        `Application with ID ${application_id} not found`
      );
    }

    return mapRowToApplication(rows[0]);
  }
}
