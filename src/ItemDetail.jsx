import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabase';

function ItemDetail() {
    const { id } = useParams(); // Get the item id from the URL
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            const { data, error } = await supabase.from('SCP').select('*').eq('id', id).single();
            if (error) {
                console.error(error);
            } else {
                setItem(data);
            }
        };
        fetchItem();
    }, [id]);

    if (!item) {
        return <div>Loading...</div>; // Display loading while fetching
    }

    return (
        <div>
            <h2>{item.item}</h2>
            <p><strong>Class:</strong> {item.class}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Containment:</strong> {item.containment}</p>
            <img src={item.image} alt={item.item} style={{ maxWidth: '300px' }} /> {/* Display the image if available */}
            <button onClick={() => window.history.back()}>Back</button> {/* Button to go back */}
        </div>
    );
}

export default ItemDetail;
