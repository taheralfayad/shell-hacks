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

// Aggregate all of the numerical values for Company and map them to calculateScore. Add the results to a new object and return it.
router.get(`/score`, async (req, res) => {
    try {
        const allCompanies = await Company.find();

        if (!allCompanies) {
            return res.status(404).json({ error: 'Companies not found' });
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

        const mappedCompanies = [];
        for (let company in allCompanies) {
            const companyObj = {};
            companyObj.carbonEmissions = calculateScore(
                0,
                100,
                allCompanies[company].carbonEmissions,
                minMaxCompanyData.minCarbonEmissions,
                minMaxCompanyData.maxCarbonEmissions,
                true
            );
            companyObj.renewableEnergyUsage = calculateScore(
                0,
                100,
                allCompanies[company].renewableEnergyUsage,
                minMaxCompanyData.minRenewableEnergyUsage,
                minMaxCompanyData.maxRenewableEnergyUsage
            );
            companyObj.wasteGenerated = calculateScore(
                0,
                100,
                allCompanies[company].wasteGenerated,
                minMaxCompanyData.minWasteGenerated,
                minMaxCompanyData.maxWasteGenerated,
                true
            );
            companyObj.minorityDiversity = calculateScore(
                0,
                100,
                allCompanies[company].minorityDiversity,
                minMaxCompanyData.minMinorityDiversity,
                minMaxCompanyData.maxMinorityDiversity
            );
            companyObj.nonProfitContributions = calculateScore(
                0,
                100,
                allCompanies[company].nonProfitContributions,
                minMaxCompanyData.minNonProfitContributions,
                minMaxCompanyData.maxNonProfitContributions
            );
            companyObj.employeeTurnover = calculateScore(
                0,
                100,
                allCompanies[company].employeeTurnover,
                minMaxCompanyData.minEmployeeTurnover,
                minMaxCompanyData.maxEmployeeTurnover,
                true
            );

            mappedCompanies.push(companyObj);
        }

        let result = mappedCompanies.reduce((sumCompany, nextCompany) => {
            return {
                carbonEmissions:
                    sumCompany.carbonEmissions + nextCompany.carbonEmissions,
                renewableEnergyUsage:
                    sumCompany.renewableEnergyUsage +
                    nextCompany.renewableEnergyUsage,
                wasteGenerated:
                    sumCompany.wasteGenerated + nextCompany.wasteGenerated,
                minorityDiversity:
                    sumCompany.minorityDiversity +
                    nextCompany.minorityDiversity,
                nonProfitContributions:
                    sumCompany.nonProfitContributions +
                    nextCompany.nonProfitContributions,
                employeeTurnover:
                    sumCompany.employeeTurnover + nextCompany.employeeTurnover,
            };
        });

        res.json({
            carbonEmissions: result.carbonEmissions / mappedCompanies.length,
            renewableEnergyUsage:
                result.renewableEnergyUsage / mappedCompanies.length,
            wasteGenerated: result.wasteGenerated / mappedCompanies.length,
            minorityDiversity:
                result.minorityDiversity / mappedCompanies.length,
            nonProfitContributions:
                result.nonProfitContributions / mappedCompanies.length,
            employeeTurnover: result.employeeTurnover / mappedCompanies.length,
        });
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
