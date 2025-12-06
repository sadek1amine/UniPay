import React from 'react';
import HeaderBox from '@/components/HeaderBox';
import BoiteDeSoldeTotale from '@/components/BoiteDeSoldeTotale';
import { RightSidebar } from '@/components/RightSidebar';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import RecentTransactions from '@/components/RecentTransactions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from '@/components/BankTabItem';
import BankInfo from '@/components/BankInfo';

interface SearchParamProps {
  searchParams: {
    id: string;
    page: string;
  }
}

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page) || 1;
  const loggedIn = await getLoggedInUser();
  
  if (!loggedIn) return null;

  const accounts = await getAccounts({ 
    userId: loggedIn.$id
  });

  if (!accounts) return null;
  
  const accountsData = accounts.data;
  const appwriteItemId = id || accountsData[0]?.appwriteItemId;

  if (!appwriteItemId) return null;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Bienvenue"
            user={loggedIn?.firstName || 'Invité'}
            subtext="Accédez à votre compte et gérez vos transactions efficacement."
          />

          <BoiteDeSoldeTotale
            accounts={accountsData}
            totalBanks={accounts.totalBanks}
            totalCurrentBalance={accounts.totalCurrentBalance}
          />
        </header>
         <HeaderBox 
                        title="Transactions récentes"
                        subtext=" "
                      />
        
        <Tabs defaultValue={appwriteItemId} className="w-full">
          <TabsList className="recent-transactions-tablist">
            {accountsData.map((account) => (
              <TabsTrigger key={account.id} value={account.appwriteItemId}>
                <BankTabItem
                  account={account}
                  appwriteItemId={appwriteItemId}
                />
              </TabsTrigger>
            ))}
          </TabsList>

          {accountsData.map((account) => (
            <TabsContent
              value={account.appwriteItemId}
              key={account.id}
              className="space-y-4"
            >
              <BankInfo 
                account={account}
                appwriteItemId={appwriteItemId}
                type="full"
              />
               
                     
                   
              <RecentTransactions 
                accounts={accountsData}
                appwriteItemId={appwriteItemId}
                searchParams={{ id, page }}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={account?.transactions || []}
        banks={accountsData.slice(0, 2)}
      />
    </section>
  );
}

export default Home;