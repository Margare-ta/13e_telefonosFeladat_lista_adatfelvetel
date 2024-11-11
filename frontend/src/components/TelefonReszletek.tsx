import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Phone {
    id: number;
    brand: string;
    model: string;
    price: number;
}

export default function TelefonReszletek(){

    const [phone, setPhone] = useState<Phone>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { phoneId } = useParams < { phoneId: string }>();
    
    useEffect(() => {

        fetch(`http://localhost:3000/phones/${phoneId}`)
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
                console.log(data);
                setPhone(data);
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
            <h2>Telefon Részletei</h2>
            <a href="/telefonfelvetel">Új telefon felvétele</a><br />
            <a href="/telefontorles">Telefonok törlése</a>
            <a href="/telefonok">Visza a listához</a>
            
            {phone ? (
                <div>
                    <h3>{phone.brand}: {phone.model}</h3>
                    {phone.brand} {phone.model} - {phone.price}
                </div>
            ) : (
                    <p>No phone data</p>
            )}
           
        </div>
    </>
}