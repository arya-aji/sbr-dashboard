import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function SampleStatus({ tipe, status }: { tipe: string, status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-blue-500 text-white': tipe === 'UTAMA',
          'bg-red-500 text-white': tipe === 'PENGGANTI',
          'bg-yellow-500 text-black': tipe !== 'UTAMA',
        },
      )}
    >
      {tipe === 'UTAMA' && status === '0' ? (
        <>
          UTAMA
        </>
      ) : null}
      {tipe === 'PENGGANTI' && status === '0' ? (
        <>
          PENGGANTI
        </>
      ) : null}
      {tipe === 'UTAMA' && status === '1' ? (
        <>
          TERGANTIKAN
        </>
      ) : null}
      {tipe === 'PENGGANTI' && status === '1' ? (
        <>
          TERGANTIKAN
        </>
      ) : null}
      {tipe !== 'UTAMA' && tipe !== 'PENGGANTI' ? (
        <>
          {status}
        </>
      ) : null}
    </span>
  );
}
