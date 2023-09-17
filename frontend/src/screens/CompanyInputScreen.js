import React from 'react';
import './CompanyInputScreen.css';
import InputCompany from '../components/InputCompany';
import Navbar from '../components/Navbar';
import { useAuth0 } from "@auth0/auth0-react";
import HeroSection from '../components/HeroSection';
import FrontTable from '../components/FrontTable';

const CompanyInputScreen = () => {

    return (
        <div id="company-input-screen">
            <Navbar/>
            <div id="company-input">
                <HeroSection/>
                <InputCompany/>
            </div>
        </div>
    );
};

export default CompanyInputScreen;
