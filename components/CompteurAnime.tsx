'use client';
import CountUp from 'react-countup';

const CompteurAnime = ({montant}: {montant:number}) => {
    return (
        <div className='w-full'>
            <CountUp
             duration={1}
             decimals={2}
             decimal=','
             prefix='$'
             end={montant} />
        </div>
    );
};

export default CompteurAnime;
