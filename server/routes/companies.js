import express from 'express';
import Company from '../models/company.js';
import calculateScore from '../utils/calculateScore.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(201).json(company);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a list of all companies
router.get('/', async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific company by ID
router.get('/:stockSymbol', async (req, res) => {
    try {
        const company = await Company.findOne({
            stockSymbol: req.params.stockSymbol,
        });
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }
        res.json(company);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:stockSymbol/score', async (req, res) => {
    try {
        const company = await Company.findOne({
            stockSymbol: req.params.stockSymbol,
        });
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        let minMaxCompanyData;
        await Company.aggregate([
            {
                $group: {
                    _id: null,
                    maxCarbonEmissions: { $max: '$carbonEmissions' },
                    minCarbonEmissions: { $min: '$carbonEmissions' },
                    maxRenewableEnergyUsage: { $max: '$renewableEnergyUsage' },
                    minRenewableEnergyUsage: { $min: '$renewableEnergyUsage' },
                    maxWasteGenerated: { $max: '$wasteGenerated' },
                    minWasteGenerated: { $min: '$wasteGenerated' },
                    maxMinorityDiversity: { $max: '$minorityDiversity' },
                    minMinorityDiversity: { $min: '$minorityDiversity' },
                    maxNonProfitContributions: {
                        $max: '$nonProfitContributions',
                    },
                    minNonProfitContributions: {
                        $min: '$nonProfitContributions',
                    },
                    maxEmployeeTurnover: { $max: '$employeeTurnover' },
                    minEmployeeTurnover: { $min: '$employeeTurnover' },
                },
            },
        ])
            .exec()
            .then((result) => {
                minMaxCompanyData = result[0];
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        const chartData = {};
        chartData.carbonEmissions = calculateScore(
            0,
            100,
            company.carbonEmissions,
            minMaxCompanyData.minCarbonEmissions,
            minMaxCompanyData.maxCarbonEmissions,
            true
        );
        chartData.renewableEnergyUsage = calculateScore(
            0,
            100,
            company.renewableEnergyUsage,
            minMaxCompanyData.minRenewableEnergyUsage,
            minMaxCompanyData.maxRenewableEnergyUsage
        );
        chartData.wasteGenerated = calculateScore(
            0,
            100,
            company.wasteGenerated,
            minMaxCompanyData.minWasteGenerated,
            minMaxCompanyData.maxWasteGenerated,
            true
        );
        chartData.minorityDiversity = calculateScore(
            0,
            100,
            company.minorityDiversity,
            minMaxCompanyData.minMinorityDiversity,
            minMaxCompanyData.maxMinorityDiversity
        );
        chartData.nonProfitContributions = calculateScore(
            0,
            100,
            company.nonProfitContributions,
            minMaxCompanyData.minNonProfitContributions,
            minMaxCompanyData.maxNonProfitContributions
        );
        chartData.employeeTurnover = calculateScore(
            0,
            100,
            company.employeeTurnover,
            minMaxCompanyData.minEmployeeTurnover,
            minMaxCompanyData.maxEmployeeTurnover,
            true
        );

        res.json(chartData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a specific company by ID
router.put('/:id', async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // Return the updated company
            }
        );
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }
        res.json(company);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a specific company by ID
router.delete('/:id', async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }
        res.json({ message: 'Company deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
