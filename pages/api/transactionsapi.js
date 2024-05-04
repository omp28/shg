import pool from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const connection = await pool.getConnection();
    const [members] = await connection.query("SELECT * FROM transactions natural join contributions,members where contributions.memberID = members.memberID");
    connection.release();
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching members:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}