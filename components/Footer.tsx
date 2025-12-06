import { useRouter } from 'next/router';
import React from 'react'
import Image from 'next/image';
import { loggoutAccount } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

export const Footer = ({user,type= 'desktop'}:FooterProps) => {
    const handleLogOut = async()=>{
        
        const loggedOut= await loggoutAccount(); 
        if(loggedOut)redirect('/sign-in')
    }
  return (
    <footer className="footer">
        <div className={type == 'mobile'?'footer_name-mobile':'footer_name'}>

            <p className="text-xl font-bold text-gray-700">
                {}
            </p>

        </div>
        <div  className={type == 'mobile'?'footer_email-mobile':'footer_email'}>
               <h1 className='text-14 truncate text-gray-700 font-semibold'>
                {user?.name}
               </h1>
               <p className='text-14 truncate font-normal text-gray-600'>
                {user?.email}
               </p>
        </div >
        <div className="footer-image" onClick ={handleLogOut}>
        <Image src="/icons/logout.svg" alt="Logout" width={24} height={24} />
        </div>
    </footer>
  )
}
export default Footer