import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
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
import { PiPlant } from 'react-icons/pi';
import { BsPeople } from 'react-icons/bs';
import { MdExpandMore } from 'react-icons/md';
import { Radar } from 'react-chartjs-2';
import { green } from '@mui/material/colors';

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
                borderCapStyle	: 'round',
            },
            suggestedMin: 0,
            suggestedMax: 100,
            borderColor: 'black',
            borderCapStyle	: 'round',
        },
    },
    //background color to purple
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
                    backgroundColor: 'rgba(255, 99, 132, 0.4)',
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
                    backgroundColor: 'rgba(54, 162, 235, 0.4)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                }
            ],
        };

        setChartData(data);
    };

    const getEnvironmentalScore = useMemo(() => {
        if (!chartData) return '';
        const chartDataObj = chartData.datasets[0].data;
        return ((chartDataObj[0] + chartDataObj[1] + chartDataObj[2]) / 3).toFixed(2);
    }, [chartData])

    const getSocialScore = useMemo(() => {
        if (!chartData) return '';
        console.log(chartData)
        const chartDataObj = chartData.datasets[0].data;
        return ((chartDataObj[3] + chartDataObj[4] + chartDataObj[5]) / 3).toFixed(2);
    }, [chartData])

    const getTotalScore = useMemo(() => {
        if (!chartData) return '';
        console.log(chartData)
        const chartDataObj = chartData.datasets[0].data;
        const sum = chartDataObj.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return (sum / 6).toFixed(2);
    }, [chartData])

    const getGradColor = (value) => {
        if (value < 20) {
            return "red";
        } else if (value < 35) {
            return "#c2410c";
        } else if (value < 60) {
            return "#eab308";
        } else if (value < 85) {
            return "#15803d"
        } else {
            return "#22c55e"
        }
    }

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
        <div class="flex justify-between items-center mr-6">
            <Typography variant="h8" component="div"  class="text-5xl mt-2 p-2 ml-8" gutterBottom>
                    {loading ? 'Loading' : companyData.name}
                    <Typography variant="h8"  component="div" class="text-2xl" gutterBottom>
                        {loading ? '' : "(" + companyData.stockSymbol + ")"}
                    </Typography>
            </Typography>

            <div class="flex mt-8 items-end">
                <Typography style={{ color: 'black'}} variant='h4' class="text-4xl mr-4">Sustainability Score: </Typography>
                <Typography variant='h4' style={{ color: getGradColor(getTotalScore) }} class="text-4xl">{getTotalScore}</Typography>
            </div>

        </div>
        <Divider class="mt-2" variant="middle" />
        <Card variant="outlined" class="flex justify-start w-full p-6">
            <CardContent>
                {companyData ? (
                        <div class="flex flex-col gap-4 pr-6 border rounded p-2">
                            <Typography
                                variant="h6"
                                class="text-4xl mb-2"
                                component="div"
                                sx={{ marginTop: 2 }}>
                                Sustainability Metrics:
                            </Typography>
                            <div class="p-2 border-b-2">
                                <div class="font-black">Carbon Emissions:</div> <i>{companyData.carbonEmissions} kt CO2</i>
                            </div>
                            <div class="p-2 border-b-2">
                                <div class="font-black">Renewable Energy Usage: </div><i> {companyData.renewableEnergyUsage}%</i>
                            </div>
                            <div class="p-2 border-b-2">
                                <div class="font-black">Waste Generated: </div><i> {companyData.wasteGenerated} kt</i>
                            </div>
                            <div class="p-2 border-b-2">
                                <div class="font-black">Minority Diversity Percentage: </div><i> {companyData.minorityDiversity}%</i>
                            </div>
                            <div class="p-2 border-b-2">
                                <div class="font-black">Non-Profit Donations: </div><i> {companyData.nonProfitContributions} million</i>
                            </div>
                            <div class="p-2 border-b-2">
                                <div class="font-black ">Employee Turnover: </div><i> {companyData.employeeTurnover}%</i>
                            </div>
                        <Divider orientation="vertical" flexItem />
                    </div>
                ) : (
                    <div style={{ width: 300 }}>
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
            <div class="w-full flex flex-col justify-center">
            {chartData ? (    
                <div style={{ width: 600, height: 600, alignSelf: 'center' }} class="text-red">
                    <Radar data={chartData} options={options} />
                </div>
            ) : null}
            {chartData ? (
             <div class="flex flex-col gap-4">
             <div class="p-6" style={{ color: getGradColor(getEnvironmentalScore) }}>
                 <div class="flex justify-between mb-4 ">
                     
                     <span class="flex gap-4 items-center text-4xl"><PiPlant /><Typography style={{ color: 'black'}} variant='h4'>Environmental Score:</Typography></span>
                     <Typography variant='h4' style={{ color: getGradColor(getEnvironmentalScore) }}>{getEnvironmentalScore}</Typography>
                 </div> 
                 <LinearProgress variant="determinate" color='inherit' value={getEnvironmentalScore}></LinearProgress>

                <Accordion class="border text-black rounded shadow-md">
                    <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>How it's calculated</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <h2 class="mb-4">- Enviromental sustainability score is determined by finding the average of the subcategory scores. Each subcategory is scored by their sustainability output compared to other S&P500 companies. </h2>
                        <div>
                            <h1>Carbon Emission: {chartData.carbonEmissions}</h1>
                            <h1>Renewable Energy Usage: {chartData.renewableEnergyUsage}</h1>
                            <h1>Waste Generated: {chartData.wasteGenerated}</h1>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div class="p-6" style={{ color: getGradColor(getSocialScore) }}>
                 <div class="flex justify-between mb-4">
                     <span class="flex gap-4 items-center text-4xl"><BsPeople /><Typography style={{ color: 'black'}} variant='h4'>Social Score:</Typography></span>
                     <Typography variant='h4' style={{ color: getGradColor(getSocialScore) }}>{getSocialScore}</Typography>
                 </div> 
                 <span><LinearProgress variant="determinate" color='inherit' value={getSocialScore}></LinearProgress></span>
                 <Accordion class="border text-black rounded shadow-md">
                    <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>How it's calculated</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <h2>- Enviromental sustainability score is determined by finding the average of the subcategory scores. Each subcategory is scored by their sustainability output compared to other S&P500 companies. </h2>
                        <div>
                            <h1>Carbon Emission:</h1>
                        </div>
                    </AccordionDetails>
                </Accordion>
             </div>
            </div>
            ) : (<div class="flex justify-center items-center">
                <CircularProgress />
                </div>
                )} 
            </div>             
        </Card>
    </div>
    );
};

export default CompanyStockInfo;
