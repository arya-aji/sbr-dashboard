import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function SampleStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-blue-500 text-white': status === 'UTAMA',
          'bg-red-500 text-white': status === 'PENGGANTI',
          'bg-yellow-500 text-black': status !== 'UTAMA',
        },
      )}
    >
      {status === 'UTAMA' ? (
        <>
          UTAMA
        </>
      ) : null}
      {status === 'PENGGANTI' ? (
        <>
          PENGGANTI
        </>
      ) : null}
      {status !== 'UTAMA' ? (
        <>
          {status}
        </>
      ) : null}
    </span>
  );
}
