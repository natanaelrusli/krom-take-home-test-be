import pool from "../database/pool";
import { Location, mapRowToLocation } from "../model/location_model";

export class LocationService {
  static async getAllLocations(): Promise<Location[]> {
    let getAllQuery = `
      SELECT * FROM location;
    `;

    const { rows } = await pool.query(getAllQuery);

    return rows.map(mapRowToLocation);
  }
}
