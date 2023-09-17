import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function CompanyTable() {
    const [companies, setCompanies] = useState([]);
    const [scores, setScores] = useState({});
    const [loading, setLoading] = useState(true);
    const [mappings, setMapping] = useState({});

    useEffect(() => {
        fetch('/companies')
            .then((response) => response.json())
            .then(async (fetchedCompanies) => {
                setCompanies(fetchedCompanies);
                
                // For each fetched company, fetch its score and update the scores state
                for (const company of fetchedCompanies) {
                    const scores = await fetchScore(company.stockSymbol);
                    let environmentalScore = getEnvironmentalScore(scores);
                    let socialScore = getSocialScore(scores);
                    let totalScore = getTotalScore(environmentalScore, socialScore);
                    setMapping(prevMapping => ({
                        ...prevMapping,
                        [company.stockSymbol]: [environmentalScore, socialScore, totalScore]
                    }));
                }

                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching company names:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        console.log(mappings);
    }, [mappings]);

    async function fetchScore(ticker) {
        try {
            let response = await fetch(`/companies/${ticker}/score`); // Fixed the string template
            let data = await response.json();
            console.log("This data:")
            console.log(data)
            return data;
        } catch (error) {
            console.error('Error:', error);
            return null;  // Return null or some default value in case of an error
        }
    }

    function getEnvironmentalScore(scores){
        if (!scores) return '';
        const scoresValues = Object.values(scores);
        return ((scoresValues[0] + scoresValues[1] + scoresValues[2]) / 3).toFixed(2)
    }

    function getSocialScore(scores){
        if (!scores) return '';
        const scoresValues = Object.values(scores);
        return ((scoresValues[3] + scoresValues[4] + scoresValues[5]) / 3).toFixed(2)
    }

    function getTotalScore(environmentalScore, socialScore) {
        environmentalScore = parseInt(environmentalScore)
        socialScore = parseInt(socialScore)
        return ((environmentalScore + socialScore) / 2).toFixed(2)
    }

    if (loading) return <div>Loading...</div>;  // Show a loading message until data is fetched

    return (
        <TableContainer component={Paper}>
            <Table aria-label="Company Table">
                <TableHead>
                    <TableRow>
                        <TableCell>Company Name</TableCell>
                        <TableCell>Stock Ticker</TableCell>
                        <TableCell>Environmental Score</TableCell>
                        <TableCell>Social Score</TableCell>
                        <TableCell>Total Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {companies.map((row) => (
                        <TableRow key={row.stockTicker}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.stockSymbol}</TableCell>
                            <TableCell>{mappings[row.stockSymbol] ? mappings[row.stockSymbol][0] : 'Loading...'}</TableCell>
                            <TableCell>{mappings[row.stockSymbol] ? mappings[row.stockSymbol][1] : 'Loading...'}</TableCell>
                            <TableCell>{mappings[row.stockSymbol] ? mappings[row.stockSymbol][2] : 'Loading...'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CompanyTable;
