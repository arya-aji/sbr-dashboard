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
        AND tipe = 'UTAMA'
      ORDER BY samples.time DESC
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
      AND tipe = 'UTAMA'
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    console.log(invoice); // Invoice is an empty array []
    return invoice[0];
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