'use client';

import { GetLicenseStatuses, AddLicense } from "@/api"
import { useState } from "react";

export default function Admin() {

  let [statuses, setStatuses] = useState([]);
  let [licenseKey, setLicenseKey] = useState('');

  return (
    <main>
      <div className="test">
        <button onClick={GetStatuses}>List licenses</button><br/>
        <button onClick={AddNewLicense}>Add license</button>
        <input maxLength={10} className="text-black" type="text" onChange={e => setLicenseKey(e.target.value)} value={licenseKey} placeholder="License key.." />
      </div>
      <table>
        <thead>
          <tr>
            <th>License</th>
            <th>Rented until</th>
            <th>Rented by</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((license) =>
            <tr key={license['licenseKey']}>
              <td>{license['licenseKey']}</td>
              <td>{license['rentedUntil']}</td>
              <td>{license['rentedBy']}</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  )

  async function GetStatuses() {
    const statuses = await GetLicenseStatuses();
    setStatuses(statuses);
  }

  async function AddNewLicense() {
    await AddLicense(licenseKey);
  }
}
