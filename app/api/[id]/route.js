// app/api/[id]/route.js

import { NextResponse } from 'next/server';
import { createClient } from '@vercel/postgres';

export async function GET(request, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const client = createClient();

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM samples WHERE idsbr = $1', [id]);
    await client.end();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Data not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Error connecting to the database', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
