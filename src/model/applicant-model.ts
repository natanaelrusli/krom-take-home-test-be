import { BaseData } from "../types";

export type Applicant = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  location: string;
  profile_image: string;
  year_of_experience: number;
} & BaseData;
