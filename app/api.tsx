export async function AddLicense(licenseKey: string) {
    const uri = `${process.env.API_BASE_URL}/license?licenseKey=${licenseKey}`;
    const res = await fetch(uri, { 
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        }
    });
    if (!res.ok) {
        let errorJson = await res.json();
        throw new Error(`Failed to add license: ${errorJson['error']}`)
    }

    return res.json()
}

export async function RentLicense(licenseKey: string, client: string) {
    const uri = `${process.env.API_BASE_URL}/rent?licenseKey=${licenseKey}&client=${client}`;
    const res = await fetch(uri, { 
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    });
    if (!res.ok) {
        let errorJson = await res.json();
        throw new Error(`Failed to rent licence key: ${errorJson['error']}`)
    }

    return res.json()
}

export async function GetLicenseStatuses() {
    const uri = `${process.env.API_BASE_URL}/licenses`;
    const res = await fetch(uri, { 
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    });
    if (!res.ok) {
        let errorJson = await res.json();
        throw new Error(`Failed to get license statuses: ${errorJson['error']}`)
    }

    return res.json()
}