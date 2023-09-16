import React from 'react';
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
