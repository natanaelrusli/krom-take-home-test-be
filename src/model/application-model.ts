import { BaseResponse, BaseData, ResponseMeta } from "../types";
import { Applicant } from "./applicant-model";
import { Role } from "./role-model";

export type Application = {
  id: number;
  applicant: Applicant;
  role: Role;
  resume_link: string;
  status: string;
} & BaseData;

export type GetApplicationRequest = {
  location?: string;
  job_role_id?: number;
  status?: string;
  filter_keyword?: string;
  curr_page: number;
  page_size: number;
};

export type GetSingleApplicationRequest = {
  application_id: number;
};

export type GetApplicationResponse = BaseResponse<Application[]>;

export type GetSingleApplicationResponse = BaseResponse<Application>;

type GetApplicationRow = {
  id: number;
  resume_link: string;
  status: string;
  app_created_time: string;
  app_updated_time: string;
  applicant_id: number;
  applicant_name: string;
  email: string;
  phone_number: string;
  location_id: number;
  location_name: string;
  profile_image: string;
  year_of_experience: number;
  applicant_created_time: string;
  applicant_updated_time: string;
  role_id: number;
  role_name: string;
  role_created_time: string;
  role_updated_time: string;
};

export function mapRowToApplication(row: GetApplicationRow): Application {
  return {
    id: row.id,
    applicant: {
      id: row.applicant_id,
      name: row.applicant_name,
      email: row.email,
      phone_number: row.phone_number,
      location: row.location_name,
      profile_image: row.profile_image,
      year_of_experience: row.year_of_experience,
      created_time: row.applicant_created_time,
      updated_time: row.applicant_updated_time,
    },
    role: {
      id: row.role_id,
      role_name: row.role_name,
    },
    resume_link: row.resume_link,
    status: row.status,
    created_time: row.app_created_time,
    updated_time: row.app_updated_time,
  };
}

export function mapToApplicationResponse(
  message: string,
  meta: ResponseMeta,
  applications: Application[]
): GetApplicationResponse {
  return {
    message,
    data: applications,
    meta,
  };
}

export function mapToSingleApplicationResponse(
  message: string,
  meta: ResponseMeta,
  application: Application
): GetSingleApplicationResponse {
  return {
    message,
    data: application,
    meta,
  };
}
