import { useState, useEffect } from "react";
import { supabase } from './supabase';
import { Link } from 'react-router-dom';
import './AdminPanel.css'; // Import the CSS file for styles

function AdminPanel() {
    const [items, setItems] = useState([]);
    const [newRecord, setNewRecord] = useState({
        item: '',
        class: '',
        description: '',
        containment: '',
        image: ''
    });

    const [editRecord, setEditRecord] = useState(null);
   
    useEffect(() => {
        const fetchItems = async () => {
            const { data, error } = await supabase.from('SCP').select('*');
            if (error) {
                console.error(error);
            } else {
                setItems(data);
            }
        };
        fetchItems();
    }, []);

    const addItem = async () => {
        if (!newRecord.item || !newRecord.class || !newRecord.description || !newRecord.containment || !newRecord.image) {
            alert("Please fill in all fields.");
            return;
        }

        const { data, error } = await supabase.from('SCP').insert([newRecord]);

if (error) {
    console.error("Error adding item:", error.message); // Log the error message
    alert(`Error adding item: ${error.message}`); // Display the error message
} else {
    setNewRecord({ item: '', class: '', description: '', containment: '', image: '' });
    alert("Item added successfully!");
}

    };

    const deleteItem = async (id) => {
        await supabase.from('SCP').delete().eq('id', id);
        window.location.reload();
    };

    const startEditing = (item) => {
        setEditRecord(item);
    };

    const saveEdit = async (id) => {
        await supabase.from('SCP').update(editRecord).eq('id', id);
        setEditRecord(null);
        window.location.reload();
    };

    return (
        <div>
            <h1>Admin Panel</h1>

            {/* Add New Record Section */}
            <div className="add-record-container">
                <h3>Add New Record</h3>
                <input 
                    className="add-record-input" 
                    value={newRecord.item} 
                    onChange={(e) => setNewRecord({ ...newRecord, item: e.target.value })} 
                    placeholder="Item"
                />
                <input 
                    className="add-record-input" 
                    value={newRecord.class} 
                    onChange={(e) => setNewRecord({ ...newRecord, class: e.target.value })} 
                    placeholder="Class"
                />
                <input 
                    className="add-record-input" 
                    value={newRecord.description} 
                    onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })} 
                    placeholder="Description"
                />
                <input 
                    className="add-record-input" 
                    value={newRecord.containment} 
                    onChange={(e) => setNewRecord({ ...newRecord, containment: e.target.value })} 
                    placeholder="Containment"
                />
                <input 
                    className="add-record-input" 
                    value={newRecord.image} 
                    onChange={(e) => setNewRecord({ ...newRecord, image: e.target.value })} 
                    placeholder="Image"
                />
               <button className="button" onClick={addItem}>Add Item</button>
            </div>

            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {editRecord && editRecord.id === item.id ? (
                            <>
                                <input 
                                    value={editRecord.item} 
                                    onChange={(e) => setEditRecord({ ...editRecord, item: e.target.value })} 
                                />
                                <input 
                                    value={editRecord.class} 
                                    onChange={(e) => setEditRecord({ ...editRecord, class: e.target.value })} 
                                />
                                <input 
                                    value={editRecord.description} 
                                    onChange={(e) => setEditRecord({ ...editRecord, description: e.target.value })} 
                                />
                                <input 
                                    value={editRecord.containment} 
                                    onChange={(e) => setEditRecord({ ...editRecord, containment: e.target.value })} 
                                />
                                <input 
                                    value={editRecord.image} 
                                    onChange={(e) => setEditRecord({ ...editRecord, image: e.target.value })} 
                                />
                                <button onClick={() => saveEdit(item.id)}>Save</button>
                                <button onClick={() => setEditRecord(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <p>{item.item}</p>
                                <Link to={`/item/${item.id}`}>
                                    <button>View Description</button>
                                </Link>
                                <button onClick={() => startEditing(item)}>Edit</button>
                                <button onClick={() => deleteItem(item.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPanel;
