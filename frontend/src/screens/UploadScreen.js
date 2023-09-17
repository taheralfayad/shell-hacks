import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

function CompanyForm() {
  const [formData, setFormData] = useState({
    name: '',
    stockSymbol: '',
    carbonEmissions: '',
    renewableEnergyUsage: '',
    wasteGenerated: '',
    minorityDiversity: '',
    nonProfitContributions: '',
    employeeTurnover: '',
    
  });
  const [message, setMessage] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/companies/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setMessage({ type: 'success', text: 'Data uploaded successfully!' });
     })
      .catch((error) => {
        console.error('Error:', error);
        setMessage({ type: 'error', text: 'There was an error uploading the data.' });
     });
      console.log('Submitted data:', formData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Company Form
      </Typography>
      {
      message && (
        <Typography color={message.type === 'success' ? 'primary' : 'error'}>
            {message.text}
        </Typography>
        )
      }
      <form onSubmit={handleSubmit}>
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="name"
      label="Company name"
      type="string"
      onChange={handleChange}
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="stockSymbol"
      label="Stock Symbol"
      type="string"
      onChange={handleChange}
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="carbonEmissions"
      label="Carbon Emissions (metric kilotonnes)"
      type="number"
      onChange={handleChange}
      inputProps={{ step: "any" }}
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="renewableEnergyUsage"
      label="Renewable Energy Usage (%)"
      type="number"
      onChange={handleChange}
      inputProps={{ step: "any" }}
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="wasteGenerated"
      label="Waste Generated (metric kilotonnes)"
      type="number"
      onChange={handleChange}
      inputProps={{ step: "any" }}
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="minorityDiversity"
      label="Minority Diversity (%)"
      type="number"
      onChange={handleChange}
      inputProps={{ step: "any" }}
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="nonProfitContributions"
      label="Non-Profit Contributions ($ in millions)"
      type="number"
      onChange={handleChange}
      inputProps={{ step: "any" }}
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="employeeTurnover"
      label="Employee Turnover (%)"
      type="number"
      onChange={handleChange}
      inputProps={{ step: "any" }}
    />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default CompanyForm;
