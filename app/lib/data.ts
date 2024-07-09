import { sql } from '@vercel/postgres';
import {
  InvoiceForm,
  Sample,
} from './definitions';


const ITEMS_PER_PAGE = 10;
export async function fetchFilteredSample(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const samples = await sql<Sample>`
      SELECT *
      FROM samples
      WHERE
        (idsbr ILIKE ${`%${query}%`} OR
        nama ILIKE ${`%${query}%`} OR
        pcl ILIKE ${`%${query}%`})
        AND pcl != ''
      ORDER BY idsbr ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return samples.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetchFilteredSample.');
  }
}

export async function fetchSamplePages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM samples
    WHERE
      (idsbr ILIKE ${`%${query}%`} OR
      nama ILIKE ${`%${query}%`} OR
      pcl ILIKE ${`%${query}%`})
      AND pcl != ''
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchSampleById(id: string) {
  try {
    const data = await sql<Sample>`
      SELECT *
      FROM samples
      WHERE idsbr = ${id};
    `;

    const sample = data.rows.map((sample) => ({
      ...sample
    }));

    return sample[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchSamples() {
  try {
    const data = await sql<Sample>`
      SELECT *
      FROM samples
      ORDER BY idsbr ASC
    `;

    const samples = data.rows;
    return samples;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all samples.');
  }
}

export async function fetchFilteredPengganti(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const samples = await sql<Sample>`
      SELECT *
      FROM samples
      WHERE
        (idsbr ILIKE ${`%${query}%`} OR
        nama ILIKE ${`%${query}%`} OR
        alamat ILIKE ${`%${query}%`} OR
        nmdesa ILIKE ${`%${query}%`})
        AND tipe = 'PENGGANTI'
        AND pcl = ''
      ORDER BY samples.time DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return samples.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetchFilteredPengganti.');
  }
}

export async function fetchPenggantiPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM samples
    WHERE
      (idsbr ILIKE ${`%${query}%`} OR
        nama ILIKE ${`%${query}%`} OR
        alamat ILIKE ${`%${query}%`} OR
        nmdesa ILIKE ${`%${query}%`})
        AND tipe = 'PENGGANTI'
        AND pcl = ''
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchFilteredUpdate(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const samples = await sql<Sample>`
      SELECT *
      FROM samples
      WHERE
        (idsbr ILIKE ${`%${query}%`} OR
        nama ILIKE ${`%${query}%`} OR
        pcl ILIKE ${`%${query}%`})
        AND status = '2'
      ORDER BY time ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return samples.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetchFilteredSample.');
  }
}

export async function fetchUpdatePages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM samples
    WHERE
      (idsbr ILIKE ${`%${query}%`} OR
      nama ILIKE ${`%${query}%`} OR
      pcl ILIKE ${`%${query}%`})
      AND status = '2'
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}