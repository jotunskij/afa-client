'use client';

import Link from 'next/link';
import { RentLicense } from './api';
import { useEffect, useState } from 'react';

export default function Home() {
  let [licenseKey, setLicenseKey] = useState('');
  let [clientId, setClientId] = useState('');
  let [leaseRemaining, setLeaseRemaining] = useState(0);
  let timer : any;

  const updateLease = () => {
    timer = !timer && setInterval(() => {
      setLeaseRemaining(oldLease => oldLease - 1);
    }, 1000)

    if (leaseRemaining < 1) {
      clearInterval(timer);
    }
  }
  
  useEffect(() => {
    updateLease()
    
    return () => { 
      clearInterval(timer);
    }
  }, [leaseRemaining])
  
  return (
    <main>
      <div>
        <p>Client
        <input maxLength={10} className="text-black" type="text" onChange={e => setClientId(e.target.value)} value={clientId} placeholder="Client id.." />
        </p>
        <br/>
        <button onClick={Rent}>Rent license</button>
        <input maxLength={10} className="text-black" type="text" onChange={e => setLicenseKey(e.target.value)} value={licenseKey} placeholder="License key.." />
        <div>{GetLeaseLeft()}</div>
        <br/>
        <Link href="/admin">Admin</Link>
      </div>
    </main>
  )

  function GetLeaseLeft() {
    if (leaseRemaining === 0) {
      return "No active lease";
    } else {
      return `${leaseRemaining} seconds left`;
    }
  }

  async function Rent() {
    await RentLicense(licenseKey, clientId);
    setLeaseRemaining(15);
  }

}
