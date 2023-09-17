import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
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
                    label: 'Sustainability Score',
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
                    label: 'Average Sustainability Score',
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
        <div>
        <Navbar />
            <Typography variant="h8" component="div"  class="text-5xl mt-2 p-2" gutterBottom>
                    {loading ? 'Loading' : companyData.name}
                    <Typography variant="h8"  component="div" class="text-2xl ml-1" gutterBottom>
                        {loading ? '' : "(" + companyData.stockSymbol + ")"}
                    </Typography>
            </Typography>
        <Divider class="mt-5" variant="middle" />
        <Card variant="outlined" class="flex justify-start w-full p-6">
            <CardContent>
                {companyData ? (
                        <div class="flex flex-col gap-2 pr-6">
                            <Typography
                                variant="h6"
                                class="text-4xl mb-2"
                                component="div"
                                sx={{ marginTop: 2 }}>
                                Sustainability Metrics:
                            </Typography>
                            <div class="p-2 border rounded">
                                <div class="font-black borde">Carbon Emissions:</div> <i>{companyData.carbonEmissions} kt CO2</i>
                            </div>
                            <div class="p-2 border rounded">
                                <div class="font-black borde">Renewable Energy Usage: </div><i> {companyData.renewableEnergyUsage}%</i>
                            </div>
                            <div class="p-2 border rounded">
                                <div class="font-black borde">Waste Generated: </div><i> {companyData.wasteGenerated} kt</i>
                            </div>
                            <div class="p-2 border rounded">
                                <div class="font-black borde">Minority Diversity Percentage: </div><i> {companyData.minorityDiversity}%</i>
                            </div>
                            <div class="p-2 border rounded">
                                <div class="font-black borde">Non-Profit Donations: </div><i> {companyData.nonProfitContributions} million</i>
                            </div>
                            <div class="p-2 border rounded">
                                <div class="font-black borde">Employee Turnover: </div><i> {companyData.employeeTurnover}%</i>
                            </div>
                        <Divider orientation="vertical" flexItem />
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

                <div class="mt-5">
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={'/'}>
                    Go Back
                </Button>
                </div>
            </CardContent>

            <div class="w-full flex justify-center">
            {chartData ? (
                <div class="w-96 h-96">
                    <Radar data={chartData} options={options} />
                </div>

            ) : null}
            </div>

        </Card>
        </div>
    );
};

export default CompanyStockInfo;
