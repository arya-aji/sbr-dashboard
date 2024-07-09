'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateSample(
  idsbrAwal: string,
  idGanti: string,
  fPcl: string,
  fPml: string,
  emailPcl: string,
  emailPml: string,
) {
  try {
    console.log("Updating sample...");
    
    const result = await sql`
      UPDATE samples
      SET 
        status = CASE
          WHEN idsbr = ${idsbrAwal} THEN '1'
          WHEN idsbr = ${idGanti} THEN '2'
          ELSE status
        END,
        pcl = CASE
          WHEN idsbr = ${idGanti} THEN ${fPcl}
          ELSE pcl
        END,
        pml = CASE
          WHEN idsbr = ${idGanti} THEN ${fPml}
          ELSE pml
        END,
        email_pcl = CASE
          WHEN idsbr = ${idGanti} THEN ${emailPcl}
          ELSE email_pcl
        END,
        email_pml = CASE
          WHEN idsbr = ${idGanti} THEN ${emailPml}
          ELSE email_pml
        END,
        time = CASE
          WHEN idsbr = ${idGanti} THEN CURRENT_TIMESTAMP
          ELSE time
        END
      WHERE idsbr IN (${idsbrAwal}, ${idGanti})
      RETURNING *;
    `;

    console.log("Update successful:", result);
    
    // Assuming these are functions provided by your framework
    revalidatePath('/dashboard');  // Verify the usage of this function
    redirect('/dashboard');  // Verify the usage of this function
  } catch (error) {
    console.error('Error updating sample:', error);
    // Handle error gracefully or throw it for higher-level error handling
    throw error;  // Rethrow the error to propagate it to the caller
  }
}
