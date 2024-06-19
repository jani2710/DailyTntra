import { useState } from 'react';

const Daily1 = () => {
  const initialData = [];


  const [data, setData] = useState(initialData);
  const [newRow, setNewRow] = useState({  name: '', age: '', location:'', contact:'' });
  const [buttonText, setButtonText] = useState('Add');
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [originalRow, setOriginalRow] = useState({});
  const [contactError, setContactError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [nameError, setNameError] = useState('');
  const [locationError, setLocationError] = useState('');


  const AddRow = () => {
    const existingName = data.find((row) => row.name === newRow.name);
    if (existingName) {
      alert("Name already exists!");
    }
    else if (newRow.name && newRow.age && newRow.location && newRow.contact) {
      setData([...data, {...newRow, id: data.length +1 }]); 
      setNewRow({ id: '', name: '', age: '', location:'', contact:'' });
      setButtonText('Added!');
      setTimeout(() => {
        setButtonText('Add Row');
      }, 1000);
    } else {
      alert("Please fill all fields");
    }
  };


  const InputChange = (field, value) => {
    setNewRow({...newRow, [field]: value });

    if (field === "age") {
      if (value.length > 2) {
        setAgeError("Age must be in 2 digits");
      } else if (value < 18) {
        setAgeError("Please enter age above 18");
        
      }
       else if (isNaN(value)){
        setAgeError("Please enter number")
      }
       else {
        setAgeError("");
        
      }
    }
    if (field === "name" && value !== "") {
      let hasNumber = false;
      let hasSpecialChar = false;
      let spaceCount = 0;
      let startsWithSpace = false;
      let endsWithSpace = false;
    
      const specialChars = ["!", "@", "#", "$", "%", "&", "*", "(", ")", "-", "+"];
    
      for (let i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) >= 48 && value.charCodeAt(i) <= 57) {
          hasNumber = true;
        }
        if (specialChars.includes(value[i])) {
          hasSpecialChar = true;
        }
        if (value[i] === " ") {
          spaceCount++;
          if (i === 0) {
            startsWithSpace = true;
          }
          if (i === value.length - 1) {
            endsWithSpace = true;
          }
        }
      }
    
      console.log(hasNumber);
      console.log(hasSpecialChar);
      console.log(spaceCount);
      console.log(startsWithSpace);
      console.log(endsWithSpace);
    
      if (hasNumber || hasSpecialChar || spaceCount > 1 || startsWithSpace || endsWithSpace) {
        if (hasNumber) {
          setNameError("No numbers allowed please!!");
        } else if (hasSpecialChar) {
          setNameError("No special characters allowed please!!");
        } else if (spaceCount > 1) {
          setNameError("Only one space is allowed!!!");
        } else if (startsWithSpace) {
          setNameError("Name cannot start with a space!!");
        } else {
          setNameError("Name cannot end with a space!!");
        }
      } else if (spaceCount === 1) {
        setNameError("");
      } else {
        setNameError("");
      }
    } else {
      setNameError(""); // if field is empty or not "name", don't show an error
    }
    if (field === "contact") {
      if (value) {
        const plusCount = value.split('+',(isNaN(value))).length-1; 
        if (plusCount > 1) {
          setContactError("Invalid Number");
        } else {
          if (value.charAt(0) === '+') {
            if (value.length > 13 || isNaN(value)) {
              setContactError("Invalid Number");
            } else {
              setContactError("");
            }
            
          } else {
            if (isNaN(value)) {
              setContactError("Invalid Number.");
            } else {
              if (value.length > 10) {
                setContactError("Number should be 10 digits.");
              } else {
                setContactError("");
              }
            }
          }
        }
      } else {
        setContactError("");
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
    if (newRow.name && newRow.age && newRow.location && newRow.contact) {
      const updatedData = data.map((row) => {
        if (row.id === editingId) {
          return newRow;
        }
        return row;
      });
      setData(updatedData);
      setNewRow({ id: '', name: '', age: '', location:'', contact:'' });
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
              <td>{row.contact}</td>
              
              
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
              {nameError && (
    <p style={{ color: 'red', fontSize: '12px' }}>
      {nameError}
    </p>
              )}
            </td>
            <td>
              <input
                type=""
                placeholder="Age"
                value={newRow.age}
                onChange={(e) => InputChange('age', e.target.value)}
                required
              />
               {ageError && (
    <p style={{ color: 'red', fontSize: '12px' }}>
      {ageError}
    </p>
               )}
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
    value={newRow.contact}
    onChange={(e) => InputChange('contact', e.target.value)}
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