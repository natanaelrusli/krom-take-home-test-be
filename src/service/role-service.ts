import pool from "../database/pool";
import { mapRowToRole, Role } from "../model/role-model";

export class RoleService {
  static async getAllRoles(): Promise<Role[]> {
    let getAllQuery = `
      SELECT * FROM role;
    `;

    const { rows } = await pool.query(getAllQuery);

    return rows.map(mapRowToRole);
  }
}
