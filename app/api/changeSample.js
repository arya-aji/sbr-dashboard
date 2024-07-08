// pages/api/changeSample.js

import { createClient } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { idGanti, namaGanti, alamatGanti, pclGanti, pmlGanti } = req.body;

    // Initialize a PostgreSQL client
    const client = createClient({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // Only for development with self-signed certificate
      },
    });

    try {
      await client.connect();

      // Perform database update
      const result = await client.query(
        `
        UPDATE samples
        SET nama = $1, alamat = $2, pcl = $3, pml = $4
        WHERE id = $5
        RETURNING *;
        `,
        [namaGanti, alamatGanti, pclGanti, pmlGanti, idGanti]
      );

      await client.end();

      res.status(200).json({ message: 'Sample updated successfully', updatedSample: result.rows[0] });
    } catch (error) {
      console.error('Error updating sample:', error);
      res.status(500).json({ error: 'Failed to update sample' });
    } finally {
      await client.end();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
