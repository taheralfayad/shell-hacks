import { Schema, model } from 'mongoose';

// Define the company schema
const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stockSymbol: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness of stock symbols
  },
  carbonEmissions: {
    type: Number,
  },
  renewableEnergyUsage: {
    type: Number,
  },
  wasteGenerated: {
    type: Number,
  },
  minorityDiversity: {
    type: Number,
  },
  nonProfitContributions: {
    type: Number,
  },
  employeeTurnover: {
    type: Number,
  },
});

// Create a Mongoose model for the company
const Company = model('Company', companySchema);

export default Company;
