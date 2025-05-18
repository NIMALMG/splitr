"use client";

import React from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import {useStoreUser} from '@/hooks/use-store-user';
import {BarLoader} from 'react-spinners';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Authenticated, Unauthenticated } from 'convex/react';
import { Button } from './ui/button';
import { LayoutDashboard } from 'lucide-react';

const Header = () => {
  const {isLoading} = useStoreUser();
  const path = usePathname();
  return (
    <header className='fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60 '>
      <nav className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <Link href={'/'} className='flex items-center gap-2'>
          <Image
            src={"/logos/logo3.png"}
            alt='splitr logo'
            width={'200'}
            height={'60'}
            className='h-11 w-auto object-contain'
          />
        </Link>
        {path==='/'&&(
          <div className='hidden md:flex items-center  gap-6'>
            <Link href='#features'
            className='text-sm font-medium hover:text-green-600 transition'
            >Features
            </Link>

            <Link href='#how-it-works'
            className='text-sm font-medium hover:text-green-600 transition'
            >How It Works
            </Link>
          </div>
        )}

        <div className='flex items-center gap-4'>
          <Authenticated>
            <Link href='/dashboard'>
            <Button variant='outing' className='hidden md:inline-flex items-center gap-2 hover:text-green-600 hover:border-green-600 transition'>

              <LayoutDashboard className='h-4 w-4'/>
              Dashboard
            </Button>
            <Button variant='gost' className='md:hidden h-10 w-10 p-0'>
              <LayoutDashboard className='h-4 w-4'/>
            </Button>
            </Link>
          </Authenticated>
          <UserButton />

          <Unauthenticated>
            <SignInButton>
              <Button variant={'ghost'}>Sign In</Button>

            </SignInButton>
            <SignUpButton>
              <Button variant={'ghost'} className={ 'hover:text-green-600 bg-green-600 border-none'}>Get Started</Button>
            </SignUpButton>
          </Unauthenticated>
        </div>
      </nav>
      {isLoading && <BarLoader width={"100%"} color='#36d7b7'/>}
    </header>
  );
};

export default Header;