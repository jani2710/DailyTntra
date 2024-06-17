import { useState } from 'react';

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
  const [originalRow, setOriginalRow] = useState({});
  const [contactError, setContactError] = useState('');

  const AddRow = () => {
    const existingName = data.find((row) => row.name === newRow.name);
    if (existingName) {
      alert("Name already exists!");
    }
    else if (newRow.name && newRow.age && newRow.location && newRow.Contact) {
      setData([...data, {...newRow, id: data.length +1 }]); 
      setNewRow({ id: '', name: '', age: '', location:'', Contact:'' });
      setButtonText('Added!');
      setTimeout(() => {
        setButtonText('Add Row');
      }, 1000);
    } else {
      alert("Please fill all fields");
    }
  };


  const InputChanger = (field, value) => {
    if (field === 'Contact') {
      let isValid = true;
      let hasPlusSign = false;
      for (let i = 0; i < value.length; i++) {
        if (i === 0 && value[i] === '+') {
          hasPlusSign = true;
          continue;
        }
        if (!/\d/.test(value[i])) {
          isValid = false;
          break;
        }
        if (hasPlusSign && value[i] === '+') {
          isValid = false;
          break;
        }
      }
      if (!isValid) {
        setContactError('Only "+" sign allowed for STD');
        return;
      }
      if (value.startsWith('+91')) {
        if (value.length > 13) {
          setContactError('Only 13 digits allowed!!');
          return;
        }
        setContactError('');
      }
      if (value.length > 10 && !value.startsWith('+91')) {
        if (value.length > 13) {
          setContactError('');
        } else {
          setContactError('More than 10 digits entered. Please ensure it is valid.');
        }
      } else {
        setContactError('');
      }
      if (value.length === 0) {
        setNewRow({...newRow, [field]: '' });
      } else {
        setNewRow({...newRow, [field]: value });
      }
    }
  };
  const EditRow = (id) => {
    setEditing(true);
    setEditingId(id);
    const row = data.find((row) => row.id === id);
    setNewRow(row); 
    setOriginalRow(row);
  };

  const UpdateRow = () => {
    if (newRow.name && newRow.age && newRow.location && newRow.Contact) {
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
    } else {
      alert("Please fill all fields");
    }
  };

  const DiscardChanges = () => {
    setNewRow(originalRow);
    setEditing(false);
  };

  const DeleteRow = (id) => {
    const updatedData = data.filter((row) => row.id!== id);
    setData(updatedData);
  };

  const DuplicateRow = (id) => {
    const rowToDuplicate = data.find((row) => row.id === id);
    const duplicatedRow = {...rowToDuplicate, id: data.length + 1};
    const existingDuplicate = data.find((row) => row.name === duplicatedRow.name && row.id!== id);
    if (!existingDuplicate) {
      setData([...data, duplicatedRow]);
    } else {
      alert("Duplicate already exists!");
    }
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
                <button onClick={() => DuplicateRow(row.id)}>Duplicate</button>
                
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
                required
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Age"
                value={newRow.age}
                onChange={(e) => InputChange('age', e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Location"
                value={newRow.location}
                onChange={(e) => InputChange('location', e.target.value)}
                required
              />
            </td>
            <td>
  <input
    type=""
    
    placeholder="Contact No."
    value={newRow.Contact}
    onChange={(e) => InputChanger('Contact', e.target.value)}
    required
  />
  {contactError && (
    <p style={{ color: 'red', fontSize: '12px' }}>
      {contactError}
    </p>
  )}
</td>
           
            
              

            
            <td>
              {editing? (
                <div>
                  <button onClick={UpdateRow}>Update</button>
                  <button onClick={DiscardChanges}>Discard Changes</button>
                </div>
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