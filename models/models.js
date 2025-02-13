const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// Customer Info Schema
const customerInfoSchema = new Schema(
  {
    id: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    companyName: { type: String },
    primaryPhone: { type: String},
    secondaryPhone: { type: String },
    primaryEmail: { type: String },
    secondaryEmail: { type: String },
    propertyAddress: {
      address1: { type: String, required: true },
      address2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: String, required: true },
    },
    mailingAddress: {
      address1: { type: String },
      address2: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
      country: { type: String },
    },
    billingAddress: {
      address1: { type: String },
      address2: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
      country: { type: String },
    },
  },
  { timestamps: true }
);

// Project Info Schema
const projectInfoSchema = new Schema(
  {
    id: { type: String },
    projectNumber: { type: String },
    projectName: { type: String },
    description: { type: String },
    insuranceClaimInvolved: { type: Boolean },
    address: {
      address1: { type: String },
      address2: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
      country: { type: String },
    },
    customerInfoId: { type: String },
    insuranceInfoId: { type: String },
    statusId: { type: String },
  },
  { timestamps: true }
);

// Insurance Info Schema
const insuranceInfoSchema = new Schema(
  {

    customerInfoId: { type: mongoose.Types.ObjectId, ref: 'CustomerInfo', required: true },
    insuranceCompany: { type: String, required: true },
    dateOfLoss: { type: Date, required: true },
    policyNumber: { type: String, required: true },
    claimNumber: { type: String, required: true },
    adjusterInfoId: { type: mongoose.Types.ObjectId, ref: 'AdjusterInfo' },
  },
  { timestamps: true }
);

// Adjuster Info Schema
const adjusterInfoSchema = new Schema(
  {
    insuranceInfoId: { type: mongoose.Types.ObjectId, ref: 'InsuranceInfo', required: true },
    adjusterName: { type: String, required: true },
    adjusterPhone: { type: String, required: true },
    adjusterFax: { type: String },
    adjusterEmail: { type: String, required: true },
  },
  { timestamps: true }
);

const projectStatusSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true }, // Hex code or predefined color
  },
  { timestamps: true }
);

// Models
const CustomerInfo = model('CustomerInfo', customerInfoSchema);
const ProjectInfo = model('ProjectInfo', projectInfoSchema);
const InsuranceInfo = model('InsuranceInfo', insuranceInfoSchema);
const AdjusterInfo = model('AdjusterInfo', adjusterInfoSchema);
const ProjectStatus = model('ProjectStatus', projectStatusSchema);

// Export Models
module.exports = {
  CustomerInfo,
  ProjectInfo,
  InsuranceInfo,
  AdjusterInfo,
  ProjectStatus,
};
