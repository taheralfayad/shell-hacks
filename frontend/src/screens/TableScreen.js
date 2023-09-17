import React from 'react';
import FrontTable from '../components/FrontTable';
import './TableScreen.css';
import Navbar from '../components/Navbar';

const TableScreen = () => {
    return (
        <>
            <Navbar />
            <div id="front-table">
                <FrontTable />
            </div>
        </>
    );
};

export default TableScreen;
