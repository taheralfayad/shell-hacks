import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@mui/material';

const CompanyStockInfo = () => {
    const params = useParams();
    const [companyData, setCompanyData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        setLoading(true);
        fetch(`/companies/${params.stockSymbol}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setCompanyData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching company data:', error);
                setCompanyData(null);
            });
    };

    useEffect(() => {
        fetchData();
        console.log(companyData)
    }, []);

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {loading ? 'Loading' : companyData.name} Information
                </Typography>
                {companyData ? (
                    <div>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ marginTop: 2 }}>
                            Company Values:
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Carbon Emissions: {companyData.carbonEmissions}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Renewable Energy Usage:{' '}
                            {companyData.renewableEnergyUsage}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Waste Generated: {companyData.wasteGenerated}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Minority Diversity Percentage:{' '}
                            {`${companyData.minorityDiversity}%`}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Non-Profit Donations:{' '}
                            {companyData.nonProfitContributions}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Employee Turnover: {companyData.employeeTurnover}
                        </Typography>
                    </div>
                ) : (
                    <div style={{ width: '15%'}}>
                        <Skeleton sx={{ fontSize: '1.25rem', marginTop: 2 }}/>
                        <Skeleton sx={{ fontSize: '1rem', marginBottom: '5.6px' }}/>
                        <Skeleton sx={{ fontSize: '1rem', marginBottom: '5.6px' }}/>
                        <Skeleton sx={{ fontSize: '1rem', marginBottom: '5.6px' }}/>
                        <Skeleton sx={{ fontSize: '1rem', marginBottom: '5.6px' }}/>
                        <Skeleton sx={{ fontSize: '1rem', marginBottom: '5.6px' }}/>
                        <Skeleton sx={{ fontSize: '1rem', marginBottom: '5.6px' }}/>
                    </div>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={'/'}>
                    Go Back
                </Button>
            </CardContent>
        </Card>
    );
};

export default CompanyStockInfo;
