const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    enum: ["Website", "Referral", "Cold Call"],
    required: true,
  },
  salesAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent", // reference to SalesAgent model
  },
  status: {
    type: String,
    enum: ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"],
    default: "New",
  },
  timeToClose: {
    type: Number,
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
}, { timestamps: true });

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;
