import pool from "@/lib/db";

export default async function postQuery(req, res) {
    try {
        const { MemberID, Duration, Interest_Rate, Date_Of_Issue, Amount } = req.body;
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        const [result] = await connection.query('INSERT INTO loan (MemberID, Duration, Interest_Rate, Date_Of_Issue, Amount) VALUES (?, ?, ?, ?, ?)', [MemberID, Duration, Interest_Rate, Date_Of_Issue, Amount]);
        await connection.commit();
        connection.release();
        console.log('Data inserted successfully');
        res.status(200).json({ success: true, message: "Data inserted successfully" });
    } catch (error) {
        await connection.rollback();
        console.error('Error inserting data:', error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}