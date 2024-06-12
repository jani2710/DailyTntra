import { useState } from 'react'

const Daily1 = () => {
  const initialData = [];

  const handleInputChange = (field, value) => {
    setNewRow({...newRow, [field]: value });
  };

  const [data, setData] = useState(initialData);
  const [newRow, setNewRow] = useState({  name: '', age: '', location:'', Contact:'' });
  const [buttonText, setButtonText] = useState('Add');



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
                placeholder="Aghhe"
                value={newRow.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Adss"
                value={newRow.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Contact No"
                value={newRow.Contact}
                onChange={(e) => handleInputChange('Contact', e.target.value)}
              />
            </td>
            <td>
              <button onClick={handleAddRow}>{buttonText}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Daily1;