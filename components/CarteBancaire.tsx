import React from 'react';
import Link from 'next/link';
import {formatterLeMontant} from "@/lib/utils"
import Image from 'next/image';

const formatAmount = (amount: number) => {
  return amount.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' });
};

export const CarteBancaire = ({ account, userName, showBalance = true }: CreditCardProps) => {
  return (
    <div className='flex flex-col'>
      <Link href="/" className="carte-bancaire">
        <div className="bank-card_content">
          <div>
            <h1 className="text-16 font-semibold text-white">{userName}</h1>
            <p className="font-ibm-plex-serif font-black text-white">
              {formatterLeMontant(account.currentBalance)}
            </p>
            
            
          </div>
          <article className='flex flex-col gap-2'>
              <div className='flex justify-between'>
                <h1 className='text-12 font-semibold  text-white'>{userName}</h1>
                <h2 className='text-12 font-semibold  text-white'>** / **</h2>
                
              </div> 
               <p className='text-14 font-semibold tracking-[1.1px] text-white'> **** **** **** <span className='text-16'>4321</span></p>

          </article>
        </div>
        <div className='bank-card_icon'>
          <Image
          src="/icons/paypass.svg"
          width= {20}
          height={24}
          alt ="pay"/>
          <Image 
          src="/icons/mastercard.svg"
          width={45}
          height={32}
          alt="mastercard"/>
          </div>
          <Image  
           src="/icons/lines.png"
           width={316}
           height={190}
           alt ="lines"
           className='absolute top-0 left-0'/>
      </Link>
    </div>
  );
};

