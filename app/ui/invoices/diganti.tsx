import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function Digantitatus({ status, idsbr }: { status: string, idsbr: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'text-black': status === '0',
          'bg-red-500 text-white': status === '1',
        },
      )}
    >
      {status === '0' ? (
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
