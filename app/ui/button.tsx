import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, disabled, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-blue-600',
        {
          'bg-blue-500 text-white hover:bg-blue-400 focus-visible:outline-blue-500': !disabled,
          'bg-gray-400 text-gray-700 cursor-not-allowed': disabled,
        },
        className,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
