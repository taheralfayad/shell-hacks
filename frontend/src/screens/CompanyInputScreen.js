import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import './CompanyInputScreen.css';
import InputCompany from '../components/InputCompany';
import Navbar from '../components/Navbar';

const CompanyInputScreen = () => {

    return (
        <div id="company-input-screen">
            <Navbar/>
            <div id="company-input">
                <InputCompany/>
            </div>
        </div>
    );
};

export default CompanyInputScreen;
