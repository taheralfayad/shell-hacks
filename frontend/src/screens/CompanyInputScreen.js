import React, { useEffect, useState } from 'react';
import './CompanyInputScreen.css';
import InputCompany from '../components/InputCompany';
import Navbar from '../components/Navbar';
import { useAuth0 } from "@auth0/auth0-react";

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
