'use client';

import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { push } = useRouter();

  useEffect(() => {
    push('/dashboard');
  }, []);
  return <p></p>;
}
