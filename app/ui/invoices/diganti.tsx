import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function Digantitatus({ status, idsbr, tipe }: { status: string, idsbr: string, tipe: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-red-500 text-white': status === '1',
          'bg-green-500 text-white': status === '2',
          'bg-yellow-500 text-white': tipe === 'PENGGANTI' && status === '0',
        },
      )}
    >
      {status === '0' ? (
        <>
          {idsbr}
        </>
      ) : null}
      {status === '2' ? (
        <>
          {idsbr}
        </>
      ) : null}
      {status === '1' ? (
        <>
          {idsbr}
        </>
      ) : null}
    </span>
  );
}
