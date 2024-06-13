import { useState } from 'react'

const Daily1 = () => {
  const initialData = [];

  const InputChange = (field, value) => {
    setNewRow({...newRow, [field]: value });
  };

  const [data, setData] = useState(initialData);
  const [newRow, setNewRow] = useState({  name: '', age: '', location:'', Contact:'' });
  const [buttonText, setButtonText] = useState('Add');
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const AddRow = () => {
    if (newRow.name || newRow.age || newRow.location || newRow.Contact) {
      setData([...data, {...newRow, id: data.length +1 }]); 
      setNewRow({ id: '', name: '', age: '', location:'', Contact:'' });
      setButtonText('Added!');
      setTimeout(() => {
        setButtonText('Add Row');
      }, 1000);
    }
  };

  const EditRow = (id) => {
    setEditing(true);
    setEditingId(id);
    const row = data.find((row) => row.id === id);
    setNewRow(row); 

  };

  const UpdateRow = () => {
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

  const DeleteRow = (id) => {
    const updatedData = data.filter((row) => row.id!== id);
    setData(updatedData);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Sr.no</th>
            <th>Name</th>
            <th>Age</th>
            <th>Location</th>
            <th>Contact No.</th>
            
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
                <button onClick={() => EditRow(row.id)}>Edit</button>
                <button onClick={() => DeleteRow(row.id)}>Delete</button>
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
                onChange={(e) => InputChange('name', e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Age"
                value={newRow.age}
                onChange={(e) => InputChange('age', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Location"
                value={newRow.location}
                onChange={(e) => InputChange('location', e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Contact No."
                value={newRow.Contact}
                onChange={(e) => InputChange('Contact', e.target.value)}
              />
            </td>
            <td>
              {editing? (
                <button onClick={UpdateRow}>Update</button>
              ) : (
                <button onClick={AddRow}>{buttonText}</button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Daily1;