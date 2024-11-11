import { useEffect, useState } from "react";

interface Phone {
    Id: number;
    Brand: string;
    Model: string;
    Price: number;
}

export default function Telefonlista(){

    const [phones, setPhones] = useState<Phone[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {

        fetch('http://localhost:3000/phones')
            .then((response) => {
                if (response.status === 404) {
                    //setErrorServer("Resource not found (404)")
                    throw new Error('Resource not found (404)');
                }
                if (!response.ok) {
                    //setErrorServer(`Server responded with status ${response.status}`)
                    throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setPhones(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    /*if (errorServer) {
        return <p>Hiba a szerver oldalon, rendszergazdát</p>
    }*/
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }


    return <>
        <div>
            <h2>Telefonok</h2>
            <a href="/telefonfelvetel">Új telefon felvétele</a><br />
            <a href="/telefontorles">Telefonok törlése</a>
            
            <ul>
                {phones.map((phone) => (
                    <li key={phone.Id}>
                        {phone.Brand} - {phone.Model} - {phone.Price} Ft
                        <a href={`/telefonok/${phone.Id}`} style={{ marginLeft: '10px' }} >
                    Részletek</a>
                    </li>
                ))}
            </ul>
        </div>
    </>
}