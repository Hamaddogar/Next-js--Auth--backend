
import { NextRequest, NextResponse } from "next/server";
const pool = require('../../../dbconfig/config')
const bcrypt = require('bcrypt');
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    try {
      const existingUserQuery = 'SELECT * FROM tester WHERE email = $1';
      const existingUserResult = await pool.query(existingUserQuery, [email]);

      if (existingUserResult.rows.length > 0) {
        return NextResponse.json({ error: "User already exists with this email" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertUserQuery = 'INSERT INTO tester (username, email, password) VALUES ($1, $2, $3) RETURNING *';
      const newUserResult = await pool.query(insertUserQuery, [username, email, hashedPassword]);

      const newUser = newUserResult.rows[0];
      return NextResponse.json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      return NextResponse.json({ error: 'Error creating user in the database', details: error });
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'Error occurred while processing the request', details: error });
  }
}


export async function GET(request: NextRequest) {
  try {
    const getUsersQuery = 'SELECT * FROM tester'; // Using tester table
    const users = await pool.query(getUsersQuery);
    return NextResponse.json(users.rows);
 
  } 
  catch (error: any) {
    console.log("Error occurred:", error);
    // Return an error response
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
}
