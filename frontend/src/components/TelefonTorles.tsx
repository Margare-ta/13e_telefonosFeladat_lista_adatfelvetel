import { useEffect, useState } from "react";

interface Phone {
    Id: number;
    Brand: string;
    Model: string;
    Price: number;
}

export default function Telefontorles(){

    const [phones, setPhones] = useState<Phone[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const handleDeletePhone = async (phoneId: string | number) => {
        let answer = confirm("Biztosan törölöd?")
        if (answer) {
            try {
            const response = await fetch("http://localhost:3000/phones/" + phoneId, {
                method: 'DELETE'
            })
            if (response.ok) {
                //hibakezelés
            }
            setPhones(phones.filter((phone) => phone.Id !== phoneId))
        }
        catch(err) {
            alert('hiba: '+ err)
        }
        }
    }
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
            <a href="/telefonok">Visza a listához</a>
            <ul>
                {phones.map((phone) => (
                    <li key={phone.Id}>
                        {phone.Brand} - {phone.Model} - {phone.Price} Ft
                    
                        <span
                            style={{ marginLeft: '10px', cursor: 'pointer' }}
                            onClick={ () => handleDeletePhone(phone.Id)}>
                            törlés
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    </>
}