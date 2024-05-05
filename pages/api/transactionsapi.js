import pool from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const connection = await pool.getConnection();
    const [members] = await connection.query(`
        SELECT t.transactionID,
        t.type,
        l.loanid AS lid,
        l.memberid AS lmid,
        l.duration,
        l.amount AS loan_amount,
        l.Interest_Rate,
        l.Date_Of_Issue,
        c.contriID AS cid,
        c.memberid AS cmid,
        c.amount AS ca,
        c.Date_of_Contribution as DoC,
        m.MemberID,
        m.NAME,
        m.Salary,
        m.Address,
        m.Marital_Status,
        m.age
        FROM transactions t
        LEFT JOIN loan l ON t.loanID = l.loanid
        LEFT JOIN contributions c ON t.contriID = c.ContriID
        INNER JOIN members m ON (l.memberid = m.MemberID OR c.memberid = m.MemberID)`
    );
    connection.release();
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching members:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}