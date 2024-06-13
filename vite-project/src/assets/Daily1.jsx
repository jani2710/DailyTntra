import { useState } from 'react'

const Daily1 = () => {
  const initialData = [];

  const handleInputChange = (field, value) => {
    setNewRow({...newRow, [field]: value });
  };

  const [data, setData] = useState(initialData);
  const [newRow, setNewRow] = useState({  name: '', age: '', location:'', Contact:'' });
  const [buttonText, setButtonText] = useState('Add');
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleAddRow = () => {
    if (newRow.name || newRow.age || newRow.location || newRow.Contact) {
      setData([...data, {...newRow, id: data.length +1 }]); 
      setNewRow({ id: '', name: '', age: '', location:'', Contact:'' });
      setButtonText('Added!');
      setTimeout(() => {
        setButtonText('Add Row');
      }, 1000);
    }
  };

  const handleEditRow = (id) => {
    setEditing(true);
    setEditingId(id);
    const row = data.find((row) => row.id === id);
    setNewRow(row);
  };

  const handleUpdateRow = () => {
    if (newRow.name || newRow.age || newRow.location || newRow.Contact) {
      const updatedData = data.map((row) => {
        if (row.id === editingId) {
          return newRow;
        }
        return row;
      });
      setData(updatedData);
      setNewRow({ id: '', name: '', age: '', location:'', Contact:'' });
      setEditing(false);
      setButtonText('Add Row');
    }
  };

  const handleDeleteRow = (id) => {
    const updatedData = data.filter((row) => row.id!== id);
    setData(updatedData);
  };

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Sr.no</th>
            <th>Name</th>
            <th>Age</th>
            <th>Location</th>
            <th>Contact No.</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.location}</td>
              <td>{row.Contact}</td>
              <td>
                <button onClick={() => handleEditRow(row.id)}>Edit</button>
                <button onClick={() => handleDeleteRow(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                placeholder="Name"
                value={newRow.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Age"
                value={newRow.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Location"
                value={newRow.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Contact No."
                value={newRow.Contact}
                onChange={(e) => handleInputChange('Contact', e.target.value)}
              />
            </td>
            <td>
              {editing? (
                <button onClick={handleUpdateRow}>Update</button>
              ) : (
                <button onClick={handleAddRow}>{buttonText}</button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Daily1;