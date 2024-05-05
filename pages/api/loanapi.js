import pool from "@/lib/db";

export default async function postQuery(req, res, connection) {
  try {
    const { membershipId, duration, amount, interest, date } = req.body;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    let loanid = 0
    let checkid = await connection.query(
      `select loanid from loan order by loanid desc limit 1`
    );
    if (checkid[0].length != 0){
      loanid = parseInt(checkid[0][0].loanid)
    }
    loanid += 1;
    let tid = 0;
    checkid = await connection.query(
      `select transactionid from transactions order by transactionid desc limit 1`
    )
    if (checkid[0].length != 0){
      tid = parseInt(checkid[0][0].transactionid)
    }
    tid += 1;
    await connection.query(
      'INSERT INTO loan (loanid, memberID, duration, amount, interest_rate, Date_Of_Issue) VALUES (?, ?, ?, ?, ?, ?)',
      [loanid, membershipId, duration, amount, interest, date]
    );
    await connection.query(
      `insert into transactions (transactionid, loanid, type) values (?, ?, "Loan")`,
      [tid, loanid]
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