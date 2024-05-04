import pool from "@/lib/db";

export default async function handler(req, res, connection) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { id, amount, date } = req.body;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    let cid = 0
    let checkid = await connection.query(
      `select contriID from contributions order by contriID desc limit 1`
    );
    if (checkid[0].length != 0){
      cid = parseInt(checkid[0][0].ContriID)
    }
    cid += 1;
    let tid = 0;
    checkid = await connection.query(
      `select transactionid from transactions order by transactionid desc limit 1`
    )
    if (checkid[0].length != 0){
      tid = parseInt(checkid[0][0].transactionID)
    }
    tid += 1;
    await connection.query(
      `INSERT INTO contributions (contriID, memberID, amount, Date_of_Contribution) VALUES (?, ?, ?, ?)`,
      [cid, id, amount, date]
    );
    await connection.query(
        `insert into transactions (transactionid, contriid, type) values (?, ?, "Contribution")`,
        [tid, cid]
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