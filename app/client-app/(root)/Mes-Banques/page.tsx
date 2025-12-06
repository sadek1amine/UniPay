import { CarteBancaire } from '@/components/CarteBancaire';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })

  return (
    <section className='flex'>
      <div className="my-banks">
        <HeaderBox 
          title="Mes Comptes Bancaires"
          subtext="Gérez vos activités bancaires sans effort."
        />

        <div className="space-y-4">
          <h2 className="header-2">
           Vos cartes
          </h2>
          <div className="flex flex-wrap gap-6">
            {accounts && accounts.data.map((a: Account) => (
              <CarteBancaire
                key={accounts.id}
                account={a}
                userName={loggedIn?.firstName}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks