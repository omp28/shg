import pool from "@/lib/db";

export default async function handler(req, res, connection) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { name, age, address, monthlyIncome, marriageStatus } = req.body;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    let latestID = await connection.query(
        `select memberID from members order by memberID desc limit 1`
    );
    console.log(latestID);
    latestID = parseInt(latestID[0][0].memberID)
    latestID += 1;
    console.log(latestID);
    console.log(typeof latestID);
    const [result] = await connection.query(
      `INSERT INTO members (memberID, name, age, address, salary, marital_status) VALUES (?, ?, ?, ?, ?, ?)`,
      [latestID, name, age, address, monthlyIncome, marriageStatus === "married" ? 1 : 0]
    );

    await connection.commit();
    connection.release();

    console.log("New member added successfully:", result.insertId);
    res.status(200).json({ success: true, message: "Member added successfully" });
  } catch (error) {
    console.error("Error adding member:", error.message);
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}