import { Client, Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'applicant_tracking_db',
  password: 'postgres',
  port: 5432,
});

export default pool;