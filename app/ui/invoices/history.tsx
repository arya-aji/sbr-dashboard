import Image from 'next/image';
import { UpdateInvoice } from '@/app/ui/invoices/buttons';
import SampleStatus from '@/app/ui/invoices/status';
import DigantiStatus from '@/app/ui/invoices/diganti';
import { fetchFilteredUpdate } from '@/app/lib/data';

export default async function SampleTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const samples = await fetchFilteredUpdate(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {samples?.map((sample) => (
              <div
                key={sample.idsbr}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{sample.idsbr}</p>
                    </div>
                    <div className="mb-2 flex items-center">
                      <p>{sample.nama}</p>
                    </div>
                    <p className="text-sm text-gray-500">{sample.pcl}</p>
                  </div>
                  <SampleStatus tipe={sample.tipe} status={sample.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={sample.idsbr} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  ID SBR
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Nama Perusahaan
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Petugas
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {samples?.map((sample) => (
                <tr
                  key={sample.idsbr}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <DigantiStatus status={sample.status} idsbr={sample.idsbr} tipe={sample.tipe} />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {sample.nama}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {sample.pcl}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <SampleStatus tipe={sample.tipe} status={sample.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={sample.idsbr} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
