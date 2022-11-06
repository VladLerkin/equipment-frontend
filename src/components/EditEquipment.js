import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function EditEquipment(props) {
  const [open, setOpen] = useState(false);
  const [equipment, setEquipment] = useState({
    brand: '', model: '', serialNumber: '',  
    year: '', fuel:'', price:  ''
  });
    
  // Open the modal form and update the equipment state
  const handleClickOpen = () => {
    setEquipment({
      brand: props.data.row.brand,
      model: props.data.row.model,
      serialNumber: props.data.row.serialNumber,
      year: props.data.row.year,
      fuel: props.data.row.fuel,
      price: props.data.row.price 
    })      
    setOpen(true);
  }
  
  // Close the modal form 
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleChange = (event) => {
    setEquipment({...equipment, 
      [event.target.name]: event.target.value});
  }

  // Update equipment and close modal form 
  const handleSave = () => {
    props.updateEquipment(equipment, props.data.id);
    handleClose();
  }
 
  return(
    <div>
      <IconButton onClick={handleClickOpen}>
          <EditIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit equipment</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
              <TextField label="Brand" name="brand" autoFocus
                variant="standard" value={equipment.brand} 
                onChange={handleChange}/>
              <TextField label="Model" name="model" 
                variant="standard" value={equipment.model} 
                onChange={handleChange}/>
              <TextField label="SerialNumberr" name="serialNumber" 
                variant="standard" value={equipment.serialNumber} 
                onChange={handleChange}/>
              <TextField label="Year" name="year" 
                variant="standard" value={equipment.year} 
                onChange={handleChange}/>
              <TextField label="Price" name="price" 
                variant="standard" value={equipment.price} 
                onChange={handleChange}/>
            </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>            
    </div>
  );
}

export default EditEquipment;