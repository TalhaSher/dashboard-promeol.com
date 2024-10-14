import React, { useState } from 'react';
import { Box, Button, TextField, Grid, MenuItem } from '@mui/material';

const NewProductForm = ({ onAddProduct }:any) => {
  const [productName, setProductName] = useState('');
  const [status, setStatus] = useState('prod');
  const [description1, setDescription1] = useState('');
  const [description2, setDescription2] = useState('');
  const [technicalInfo, setTechnicalInfo] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');

  const handleSubmit = () => {
    const newProduct = {
      productName,
      status,
      description1,
      description2,
      technicalInfo,
      youtubeLink,
    };
    onAddProduct(newProduct);
    // Reset form fields if needed
    setProductName('');
    setStatus('prod');
    setDescription1('');
    setDescription2('');
    setTechnicalInfo('');
    setYoutubeLink('');
  };

  return (
    <Box component="form" sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="prod">Production</MenuItem>
            <MenuItem value="dev">Development</MenuItem>
            <MenuItem value="idea">Idea</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="YouTube Link"
            variant="outlined"
            fullWidth
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description (Paragraph 1)"
            variant="outlined"
            fullWidth
            multiline
            maxRows={4}
            inputProps={{ maxLength: 370 }}
            value={description1}
            onChange={(e) => setDescription1(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description (Paragraph 2)"
            variant="outlined"
            fullWidth
            multiline
            maxRows={4}
            inputProps={{ maxLength: 370 }}
            value={description2}
            onChange={(e) => setDescription2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Technical Info"
            variant="outlined"
            fullWidth
            multiline
            maxRows={6}
            inputProps={{ maxLength: 600 }}
            value={technicalInfo}
            onChange={(e) => setTechnicalInfo(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Add Product
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewProductForm;
