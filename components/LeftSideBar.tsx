"use client"
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function LeftSideBar() {
const pathname = usePathname()
const router = useRouter()

console.log(pathname);


  return (
    <section className='left_sidebar'>
        <nav className='flex flex-col gap-6'>
            <Link href={"/"} className='flex cursor-pointer  items-center gap-1 pb-10 max-lg:justify-center'>
            <Image src={"/icons/logo.svg"} width={23} height={27} alt="logo"/>
            <h1 className='text-24 font-extrabold text-white max-lg:hidden'>PodAiCast</h1>
            </Link>
        {
          sidebarLinks.map((link)=>{
            const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)

            return (
             <Link href={link.route} key={link.label} 
             className={cn('flex gap-3 py-4 max-lg:px-4 justify-center lg:justify-start  items-center',
              {'bg-nav-focus border-r-4 border-orange-1': isActive},
             )}>
              <Image src={link.imgURL} width={24} height={24} alt={link.label} />
              {link.label}
             </Link>
            )})
        }
        </nav>
    </section>
  )
}

export default LeftSideBar