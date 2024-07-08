'use client';

import { Sample } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useEffect, useState, ChangeEvent } from 'react';

export default function EditSampleForm({
  sampleId,
  samples
}: {
  sampleId: Sample,
  samples: Sample[];
}) {
  const [userInput, setUserInput] = useState('');
  const [idGanti, setIdGanti] = useState('');
  const [namaGanti, setNamaGanti] = useState('');
  const [alamatGanti, setAlamatGanti] = useState('');
  const [pclGanti, setPclGanti] = useState('');
  const [pmlGanti, setPmlGanti] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  const handleButtonClick = () => {
    if (!userInput.trim()) {
      alert('Please enter a value first!');
      return;
    }

    fetchData(userInput);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const fetchData = async (id: string) => {
    setIsLoading(true);
    setIsDataFetched(false);
    try {
      const response = await fetch(`/api/${id}`); // Adjust endpoint URL as needed
      if (!response.ok) {
        throw new Error('Failed to fetch sample.');
      }
      const sample = await response.json();
      console.log(sample);
      if (sample) {
        console.log("haha");
        setNamaGanti(sample.nama); // Update namaGanti state with the fetched name
        setIdGanti(sample.idsbr);
        setAlamatGanti(sample.alamat);
        setPclGanti(sample.pcl);
        setPmlGanti(sample.pml);
        setIsDataFetched(true);
      } else {
        setNamaGanti('');
        setIdGanti('');
        setAlamatGanti('');
        setPclGanti('');
        setPmlGanti('');
        setIsDataFetched(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Perusahaan tidak ditemukan/sudah teralokasi kan ke petugas lain.');
      setNamaGanti('');
      setIdGanti('');
      setAlamatGanti('');
      setPclGanti('');
      setPmlGanti('');
      setIsDataFetched(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    // Submit form or perform desired action
    console.log('Form submitted');
    setIsModalOpen(false);
    setIsSuccessPopupOpen(true);

    // Optionally, close the success popup after a delay
    setTimeout(() => {
      setIsSuccessPopupOpen(false);
    }, 3000); // Close after 3 seconds
  };

  useEffect(() => {
    // Optional: Fetch initial data or any other side effects
  }, []);


  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <style jsx>{`
        @keyframes rainbow {
          0% { background-color: red; }
          14% { background-color: orange; }
          28% { background-color: yellow; }
          42% { background-color: green; }
          57% { background-color: blue; }
          71% { background-color: indigo; }
          85% { background-color: violet; }
          100% { background-color: red; }
        }
        .loading {
          animation: rainbow 1s linear infinite;
        }
        .btn-disabled {
          background-color: #d1d5db;
          cursor: not-allowed;
        }
        .btn-disabled:hover {
          background-color: #d1d5db;
        }
      `}</style>
      {/* First column */}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* ID SBR Awal */}
        <div className="mb-4">
          <label htmlFor="idsbrAwal" className="mb-2 block text-sm font-medium">
            ID SBR Awal
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="idsbrAwal"
              name="idsbrAwal"
              value={sampleId.idsbr}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              disabled
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="fNama" className="mb-2 block text-sm font-medium">
            Nama Perusahaan
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="fNama"
              name="fNama"
              value={sampleId.nama}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              disabled
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="fAlamat" className="mb-2 block text-sm font-medium">
            Alamat
          </label>
          <div className="relative mt-2 rounded-md">
            <textarea
              id="fAlamat"
              name="fAlamat"
              value={sampleId.alamat}
              rows={3}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              disabled
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="fPcl" className="mb-2 block text-sm font-medium">
            Petugas Pencacah Lapangan
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="fPcl"
              name="fPcl"
              value={sampleId.pcl}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              disabled
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="fPml" className="mb-2 block text-sm font-medium">
            Petugas Pemeriksa Lapangan
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="fPml"
              name="fPml"
              value={sampleId.pml}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Second column */}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Label for ID SBR Ganti */}
        <div className="mb-4">
          <label htmlFor="idsbrGanti" className="mb-2 block text-sm font-medium">
            ID SBR Ganti
          </label>

          {/* Input field and button */}
          <div className="relative mt-2 rounded-md flex items-center">
            <input
              id="idsbrGanti"
              name="idsbrGanti"
              type='text'
              value={userInput}
              onChange={handleInputChange}
              className="peer block w-3/4 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <input
              id="idGanti"
              name="idGanti"
              type='hidden'
              value={idGanti}
              className="peer block w-3/4 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <button
              type="button"
              onClick={handleButtonClick}
              className={`justify-center items-center w-1/4 ml-2 flex h-10 rounded-lg px-4 text-sm font-medium text-white transition-colors ${isLoading ? 'loading' : 'bg-green-500 hover:bg-blue-600'
                }`}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Cek ID'}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="gNama" className="mb-2 block text-sm font-medium">
            Nama Perusahaan
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="gNama"
              name="gNama"
              value={namaGanti}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              disabled
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="gAlamat" className="mb-2 block text-sm font-medium">
            Alamat
          </label>
          <div className="relative mt-2 rounded-md">
            <textarea
              id="gAlamat"
              name="gAlamat"
              value={alamatGanti}
              rows={3}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              disabled
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="gPcl" className="mb-2 block text-sm font-medium">
            Petugas Pencacah Lapangan
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="gPcl"
              name="gPcl"
              value={pclGanti}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              disabled
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="gPml" className="mb-2 block text-sm font-medium">
            Petugas Pemeriksa Lapangan
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="gPml"
              name="gPml"
              value={pmlGanti}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              disabled
            />
          </div>
        </div>
      </div>


      {/* Button section */}
      <div className="mt-6 flex justify-end gap-4 col-span-full md:col-span-2">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="button" className={`${!isDataFetched && 'btn-disabled'}`} disabled={!isDataFetched} onClick={() => setIsModalOpen(true)}>
          Ganti Sampel
        </Button>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Confirm Change</h2>
            <p className="mb-6">Apakah anda yakin untuk alokasi pergantian sampel?</p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {isSuccessPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Success</h2>
            <p className="mb-6">Sample has been successfully changed.</p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsSuccessPopupOpen(false)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );



}
