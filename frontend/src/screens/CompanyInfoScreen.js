import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const options = {
    scales: {
        r: {
            angleLines: {
                display: false,
            },
            suggestedMin: 0,
            suggestedMax: 100,
        },
    },
};

const CompanyStockInfo = () => {
    const params = useParams();
    const [companyData, setCompanyData] = useState(null);
    const [chartData, setChartData] = useState(null);
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

    const getChartData = async () => {
        let response = await fetch(`/companies/${params.stockSymbol}/score`);
        const companyChartData = await response.json();

        response = await fetch(`/companies/score`);
        const companyChartData2 = await response.json();

        const data = {
            labels: [
                'Carbon Emissions',
                'Renewable Energy Usage',
                'Waste Generated',
                'Minority Diversity',
                'Non-Profit Donations',
                'Employee Turnover',
            ],
            datasets: [
                {
                    label: 'ESG Score',
                    data: [
                        companyChartData.carbonEmissions,
                        companyChartData.renewableEnergyUsage,
                        companyChartData.wasteGenerated,
                        companyChartData.minorityDiversity,
                        companyChartData.nonProfitContributions,
                        companyChartData.employeeTurnover,
                    ],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Average ESG Score',
                    data: [
                        companyChartData2.carbonEmissions,
                        companyChartData2.renewableEnergyUsage,
                        companyChartData2.wasteGenerated,
                        companyChartData2.minorityDiversity,
                        companyChartData2.nonProfitContributions,
                        companyChartData2.employeeTurnover,
                    ],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                }
            ],
        };

        setChartData(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(companyData);
        getChartData();
    }, [companyData]);

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
                        {chartData ? (
                            <Card sx={{ width: 500, height: 500 }}>
                                <Radar data={chartData} options={options} />
                            </Card>
                        ) : null}
                    </div>
                ) : (
                    <div style={{ width: '15%' }}>
                        <Skeleton sx={{ fontSize: '1.25rem', marginTop: 2 }} />
                        <Skeleton
                            sx={{ fontSize: '1rem', marginBottom: '5.6px' }}
                        />
                        <Skeleton
                            sx={{ fontSize: '1rem', marginBottom: '5.6px' }}
                        />
                        <Skeleton
                            sx={{ fontSize: '1rem', marginBottom: '5.6px' }}
                        />
                        <Skeleton
                            sx={{ fontSize: '1rem', marginBottom: '5.6px' }}
                        />
                        <Skeleton
                            sx={{ fontSize: '1rem', marginBottom: '5.6px' }}
                        />
                        <Skeleton
                            sx={{ fontSize: '1rem', marginBottom: '5.6px' }}
                        />
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
