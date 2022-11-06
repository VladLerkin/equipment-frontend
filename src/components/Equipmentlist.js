import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../constants.js'
import { 
  DataGrid, 
  GridToolbarContainer, 
  GridToolbarExport, 
  gridClasses } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import AddEquipment from './AddEquipment.js';
import EditEquipment from './EditEquipment.js';

function CustomToolbar() {
  return (
    <GridToolbarContainer 
      className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function Equipmentlist() {
  const [equipments, setEquipments] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = () => {
    // Read the token from the session storage
    // and include it to Authorization header 
    const token = sessionStorage.getItem("jwt"); 

    fetch(SERVER_URL + 'api/equipments', {
      headers: { 'Authorization' : token }
    })
    .then(response => response.json())
    .then(data => setEquipments(data._embedded.equipments))
    .catch(err => console.error(err));    
  }
  
  const onDelClick = (url) => {
    if (window.confirm("Are you sure to delete?")) {
      const token = sessionStorage.getItem("jwt"); 

      fetch(url, {
        method:  'DELETE', 
        headers: { 'Authorization' : token }
      })
      .then(response => { 
        if (response.ok) {
          fetchEquipments();
          setOpen(true);
        }
        else {
          alert('Something went wrsong!');
        }  
      })
      .catch(err => console.error(err))
    }
  }

  // Add a new equipment 
  const addEquipment = (equipment) => {
    const token = sessionStorage.getItem("jwt"); 

    fetch(SERVER_URL  +  'api/equipments',
      { method: 'POST', headers: {
        'Content-Type':'application/json',
        'Authorization' : token
      },
      body: JSON.stringify(equipment)
    })
    .then(response => {
      if (response.ok) {
        fetchEquipments();
      }
      else {
        alert('Something went wrong!');
      }
    })
    .catch(err => console.error(err))
  }
  
  // Update equipment 
  const updateEquipment = (equipment, link) => {
    const token = sessionStorage.getItem("jwt"); 

    fetch(link,
      { 
        method: 'PUT', 
        headers: {
        'Content-Type':'application/json',
        'Authorization' : token
      },
      body: JSON.stringify(equipment)
    })
    .then(response => {
      if (response.ok) {
        fetchEquipments();
      }
      else {
        alert('Something went wrong!');
      }
    })
    .catch(err => console.error(err))
  }

  const columns = [
    {field: 'brand', headerName: 'Brand', width: 200},
    {field: 'model', headerName: 'Model', width: 200},
    {field: 'serialNumber', headerName: 'SerialNumber', width: 200},
    {field: 'year', headerName: 'Year', width: 150},
    {field: 'price', headerName: 'Price', width: 150},
    {
      field: '_links.equipment.href', 
      headerName: '', 
      sortable: false,
      filterable: false,
      renderCell: row => 
        <EditEquipment 
          data={row} 
          updateEquipment={updateEquipment} />
    },  
    {
      field: '_links.self.href', 
      headerName: '', 
      sortable: false,
      filterable: false,
      renderCell: row => 
        <IconButton onClick={() => onDelClick(row.id)}>
          <DeleteIcon color="error" />
        </IconButton>
    }  
  ];
  
  return(
    <React.Fragment>
      <Stack mt={2} mb={2}>
        <AddEquipment addEquipment={addEquipment} />
      </Stack>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid 
          rows={equipments} 
          columns={columns} 
          disableSelectionOnClick={true}
          components={{ Toolbar: CustomToolbar }}
          getRowId={row => row._links.self.href}/>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Equipment deleted"
        />
      </div>
    </React.Fragment>
  );

}

export default Equipmentlist;
