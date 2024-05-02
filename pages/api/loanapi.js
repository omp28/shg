import pool from "@/lib/db";

export default async function postQuery(req, res) {
  try {
    const { name, duration, interest, amount, phoneNumber,membershipId } = req.body;
    const connection = await pool.getConnection(); // Await here
    await connection.beginTransaction();
    const [result] = await connection.query(
      'INSERT INTO loan (name, duration, interest_rate, phoneNumber, amount, Date_Of_Issue,memberID) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)',
      [name, duration, interest, phoneNumber, amount, membershipId]
    );
    await connection.commit();
    connection.release();
    console.log('Data inserted successfully');
    res.status(200).json({ success: true, message: "Data inserted successfully" });
  } catch (error) {
    console.error('Error inserting data:', error.message);
    // Only rollback if connection was obtained successfully
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}