"use client";
import { useRouter } from 'next/navigation';
import CompteurAnime from './CompteurAnime';

interface BoiteDeSoldeTotaleProps {
  accounts?: any[];
  totalBanks: number;
  totalCurrentBalance: number;
}

const BoiteDeSoldeTotale = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: BoiteDeSoldeTotaleProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/Transfert-Paiement');
  };

  return (
    <section className="solde-total">
      <div className="flex flex-col gap-6">
        <h2 className="header-2">{totalBanks} Comptes Bancaires</h2>

        <div className="flex items-center justify-between">
          <p className="label-solde total">Solde Actuel Total</p>
        </div>

   <div className="montant-du-solde-total flex items-center justify-between gap-2">
  <CompteurAnime montant={totalCurrentBalance} />
  <button
    onClick={handleNavigation}
     className="bg-violet-700 hover:bg-violet-800 text-white text-sm font-medium py-1 px-6 rounded-md whitespace-nowrap ml-12"
  >
    Faire un transfert
  </button>
</div>


      </div>
    </section>
  );
};

export default BoiteDeSoldeTotale;
