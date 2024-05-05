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
    let newpool = 0
    let cpool = await connection.query(
      `select sum(amount) from contributions`
    )
    let lpool = await connection.query(
      `select sum(amount) from loan`
    )
    newpool += parseInt(cpool[0][0][`sum(amount)`])
    newpool -= parseInt(lpool[0][0][`sum(amount)`])
    await connection.commit();
    connection.release();
    res.status(200).json(newpool);
  } catch (error) {
    console.error('Error inserting data:', error.message);
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}