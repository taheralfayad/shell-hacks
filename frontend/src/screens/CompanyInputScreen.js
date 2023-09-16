import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import './CompanyInputScreen.css';

const CompanyInputScreen = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace with your API endpoint URL

        fetch('/companies')
            .then((response) => response.json())
            .then((data) => {
                setCompanies(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching company names:', error);
                setLoading(false);
            });
    }, []);

    const handleSelectionChange = (_, newValue) => {
        setSelectedCompany(newValue);
    };

    const handleArrowButtonClick = () => {
        // Handle the arrow button click, e.g., navigate to the next screen or perform an action
        console.log(
            'Arrow button clicked with selected company:',
            selectedCompany,
            'Stock Symbol:',
            selectedCompany.stockSymbol
        );
    };

    return (
        <div id="company-input-screen">
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3, width: '50%'}}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Enter Company Name
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Autocomplete
                            id="company-name"
                            options={companies}
                            getOptionLabel={(option) => option.name}
                            value={selectedCompany}
                            onChange={handleSelectionChange}
                            sx={{ flexGrow: 1, marginRight: 2 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Company Name"
                                    variant="outlined"
                                />
                            )}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            component={selectedCompany ? Link : null}
                            to={selectedCompany ? '/' + selectedCompany.stockSymbol : null}
                            disabled={!selectedCompany}
                            onClick={handleArrowButtonClick}
                            sx={{ height: '20%', width: '20%' }}>
                            Submit
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CompanyInputScreen;
