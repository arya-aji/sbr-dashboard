import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function SampleStatus({ tipe, status }: { tipe: string, status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-blue-500 text-white': status === '0',
          'bg-red-500 text-white': status === '1',
          'bg-green-500 text-white': status === '2',
        },
      )}
    >
      {status === '0' ? (
        <>
          UTAMA
        </>
      ) : null}
      {status === '2' ? (
        <>
          PENGGANTI
        </>
      ) : null}
      {status === '1' ? (
        <>
          TERGANTIKAN
        </>
      ) : null}
    </span>
  );
}
