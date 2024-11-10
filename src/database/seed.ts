import pool from "./pool";

export async function createTables() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS Location (
        id SERIAL PRIMARY KEY,
        location_name VARCHAR(100),
        created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_time TIMESTAMP,
        deleted_time TIMESTAMP
      );
    `);

    // Create Applicant table
    await client.query(`
      CREATE TABLE IF NOT EXISTS Applicant (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        phone_number VARCHAR(15),
        location_id INT,
        profile_image VARCHAR,
        created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_time TIMESTAMP,
        updated_time TIMESTAMP,
        FOREIGN KEY (location_id) REFERENCES Location(id)
      );
    `);

    // Create Role table
    await client.query(`
      CREATE TABLE IF NOT EXISTS Role (
        id SERIAL PRIMARY KEY,
        role_name VARCHAR(100),
        created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_time TIMESTAMP,
        updated_time TIMESTAMP
      );
    `);

    // Create Application table
    await client.query(`
      CREATE TABLE IF NOT EXISTS Application (
        id SERIAL PRIMARY KEY,
        applicants_id INT,
        role_id INT,
        resume_link VARCHAR(255),
        year_of_experience INT,
        status VARCHAR(50),
        created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_time TIMESTAMP,
        deleted_time TIMESTAMP,
        FOREIGN KEY (applicants_id) REFERENCES Applicant(id),
        FOREIGN KEY (role_id) REFERENCES Role(id)
      );
    `);

    await client.query("COMMIT");
    console.log("Tables created successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating tables:", error);
  } finally {
    client.release();
  }
}

export async function seedDatabase() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const locationQuery = `
      INSERT INTO Location (location_name)
      VALUES ($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), ($10),
      ($11), ($12), ($13), ($14), ($15), ($16), ($17), ($18), ($19), ($20),
      ($21), ($22), ($23), ($24), ($25), ($26), ($27), ($28), ($29), ($30),
      ($31), ($32), ($33), ($34), ($35), ($36), ($37), ($38), ($39), ($40),
      ($41), ($42), ($43), ($44), ($45), ($46), ($47), ($48), ($49), ($50)
      RETURNING id
    `;
    const locationValues = [
      "Jakarta",
      "Surabaya",
      "Bandung",
      "Medan",
      "Bekasi",
      "Tangerang",
      "Depok",
      "Semarang",
      "Palembang",
      "Makassar",
      "Bogor",
      "Batam",
      "Pekanbaru",
      "Bandar Lampung",
      "Padang",
      "Malang",
      "Denpasar",
      "Samarinda",
      "Tasikmalaya",
      "Pontianak",
      "Banjarmasin",
      "Balikpapan",
      "Jambi",
      "Cilegon",
      "Manado",
      "Yogyakarta",
      "Mataram",
      "Ambon",
      "Kupang",
      "Jayapura",
      "Palu",
      "Kendari",
      "Gorontalo",
      "Ternate",
      "Banda Aceh",
      "Pangkal Pinang",
      "Palangkaraya",
      "Kediri",
      "Sukabumi",
      "Cirebon",
      "Bengkulu",
      "Tarakan",
      "Sorong",
      "Madiun",
      "Probolinggo",
      "Lhokseumawe",
      "Tanjung Pinang",
      "Batu",
      "Singaraja",
      "Tegal",
    ];
    const locationResult = await client.query(locationQuery, locationValues);
    console.log("Inserted locations:", locationResult.rows);

    const roleQuery = `
      INSERT INTO Role (role_name)
      VALUES ($1), ($2), ($3)
      RETURNING id
    `;
    const roleValues = ["Software Engineer", "Product Manager", "Designer"];
    const roleResult = await client.query(roleQuery, roleValues);
    console.log("Inserted roles:", roleResult.rows);

    const applicantQuery = `
      INSERT INTO Applicant (name, email, phone_number, location_id, profile_image)
      VALUES 
      ($1, $2, $3, $4, $5),
      ($6, $7, $8, $9, $10),
      ($11, $12, $13, $14, $15)
      RETURNING id
    `;
    const applicantValues = [
      "John Doe",
      "john@example.com",
      "1234567890",
      locationResult.rows[0].id,
      "https://example.com/john.jpg",
      "Jane Smith",
      "jane@example.com",
      "0987654321",
      locationResult.rows[1].id,
      "https://example.com/jane.jpg",
      "Alice Johnson",
      "alice@example.com",
      "1122334455",
      locationResult.rows[2].id,
      "https://example.com/alice.jpg",
    ];
    const applicantResult = await client.query(applicantQuery, applicantValues);
    console.log("Inserted applicants:", applicantResult.rows);

    const applicationQuery = `
      INSERT INTO Application (applicants_id, role_id, resume_link, year_of_experience, status)
      VALUES 
      ($1, $2, $3, $4, $5),
      ($6, $7, $8, $9, $10),
      ($11, $12, $13, $14, $15)
      RETURNING id
    `;
    const applicationValues = [
      applicantResult.rows[0].id,
      roleResult.rows[0].id,
      "https://example.com/resume1.pdf",
      5,
      "Applied",
      applicantResult.rows[1].id,
      roleResult.rows[1].id,
      "https://example.com/resume2.pdf",
      3,
      "Contacted",
      applicantResult.rows[2].id,
      roleResult.rows[2].id,
      "https://example.com/resume3.pdf",
      7,
      "Interview Scheduled",
    ];
    const applicationResult = await client.query(
      applicationQuery,
      applicationValues
    );
    console.log("Inserted applications:", applicationResult.rows);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error seeding database:", error);
  } finally {
    client.release();
  }
}

createTables()
  .catch((error) => console.error("Error in createTables:", error))
  .then(() => {
    seedDatabase().catch((error) =>
      console.error("Error in seedDatabase:", error)
    );
  });
