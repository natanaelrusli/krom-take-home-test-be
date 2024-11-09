import { applicationStatus } from "../constant/application-status";
import pool from "../database/pool";
import { NotFoundError } from "../errors/not-found-error";
import { ResponseError } from "../errors/response-error";
import {
  Application,
  CreateApplicationRequest,
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
        app.id AS applicant_id, app.name AS applicant_name, app.email, app.phone_number, app.location_id, l.location_name, app.profile_image, a.year_of_experience,
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
        app.id AS applicant_id, app.name AS applicant_name, app.email, app.phone_number, app.location_id, l.location_name, app.profile_image, a.year_of_experience,
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

  static async createNewApplication(
    request: CreateApplicationRequest
  ): Promise<Application> {
    const {
      applicant_name,
      applicant_email,
      applicant_phone_number,
      role_id,
      years_of_experience,
      location_id,
      resume_link,
    } = request;

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const checkApplicantQuery = `
        SELECT id, name, phone_number, location_id FROM Applicant WHERE email = $1
      `;
      const checkApplicantResult = await client.query(checkApplicantQuery, [
        applicant_email,
      ]);

      let applicantId: number;

      if (checkApplicantResult.rows.length > 0) {
        // Applicant exists, fetch existing details
        const existingApplicant = checkApplicantResult.rows[0];
        applicantId = existingApplicant.id;

        // Check if the applicant has previously applied for this role
        const checkApplicationQuery = `
          SELECT id FROM Application WHERE applicants_id = $1 AND role_id = $2
        `;
        const checkApplicationResult = await client.query(
          checkApplicationQuery,
          [applicantId, role_id]
        );

        if (checkApplicationResult.rows.length > 0) {
          throw new ResponseError(
            400,
            "This applicant has already applied for this role."
          );
        }

        // check applicants detail
        // if existing detail not equal to the current payload
        // update existing with the current payload data
        if (
          existingApplicant.name !== applicant_name ||
          existingApplicant.phone_number !== applicant_phone_number ||
          existingApplicant.location_id !== location_id
        ) {
          const updateApplicantQuery = `
            UPDATE Applicant 
            SET name = $1, phone_number = $2, location_id = $3
            WHERE id = $4
          `;
          const updateValues = [
            applicant_name,
            applicant_phone_number,
            location_id,
            applicantId,
          ];
          await client.query(updateApplicantQuery, updateValues);
        }
      } else {
        const insertApplicantQuery = `
          INSERT INTO Applicant (name, email, phone_number, location_id, profile_image)
          VALUES ($1, $2, $3, $4, 'https://avatars.githubusercontent.com/u/124599?v=4')
          RETURNING id
        `;
        const applicantValues = [
          applicant_name,
          applicant_email,
          applicant_phone_number,
          location_id,
        ];
        const applicantResult = await client.query(
          insertApplicantQuery,
          applicantValues
        );
        applicantId = applicantResult.rows[0].id;
      }

      const insertApplicationQuery = `
        INSERT INTO Application (applicants_id, role_id, resume_link, status, year_of_experience)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `;
      const applicationValues = [
        applicantId,
        role_id,
        resume_link,
        "Pending",
        years_of_experience,
      ];
      const applicationResult = await client.query(
        insertApplicationQuery,
        applicationValues
      );
      const applicationId = applicationResult.rows[0].id;

      await client.query("COMMIT");

      return await this.getSingleApplication({
        application_id: applicationId,
      });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  static async getTotalDataCount(): Promise<number> {
    const getCountQuery =
      "SELECT COUNT(*) AS total_row_count FROM application LIMIT 1;";

    const { rows } = await pool.query(getCountQuery);

    return rows[0].total_row_count;
  }
}
