import pool from "@/lib/db";

export default async function handler(req, res, connection) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { id, amount, date } = req.body;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    let latestID = await connection.query(
        `select contriID from contributions order by contriID desc limit 1`
    );
    latestID = parseInt(latestID[0][0].contriID)
    latestID += 1;
    const [result] = await connection.query(
      `INSERT INTO contributions (contriID, memberID, amount, Date_of_Contribution) VALUES (?, ?, ?, ?)`,
      [latestID, id, amount, date]
    );

    await connection.commit();
    connection.release();
    res.status(200).json({ success: true, message: "Member added successfully" });
  } catch (error) {
    console.error("Error adding member:", error.message);
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}