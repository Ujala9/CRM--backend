const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Lead = require("./models/lead.model");
const Agent = require("./models/salesAgent.model");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


initializeDatabase();

// Create Lead Endpoint
app.post("/lead", async (req, res) => {
  try {
    const { name, source, salesAgent, status, tags, timeToClose, priority } = req.body;

    if (!name || !source) {
      return res.status(400).json({ error: "'name' and 'source' are required." });
    }

    const agent = await Agent.findById(salesAgent);
    if (!agent) {
      return res.status(404).json({ error: "Sales agent not found" });
    }

    const lead = new Lead({
      name,
      source,
      salesAgent,
      status,
      tags,
      timeToClose,
      priority,
    });

    const savedLead = await lead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/leads", async(req,res) =>{
   try{

    let filters = {}

    if(req.query.salesAgent){
      filters.salesAgent = req.query.salesAgent
    }

    if (req.query.status) {
      filters.status = req.query.status;
    }

    if (req.query.source) {
      filters.source = req.query.source;
    }

    if (req.query.tags) {
      filters.tags = { $in: req.query.tags.split(",") };
    }

      const leads = await Lead.find(filters)
      res.status(200).json(leads);
   } catch(error) {
      res.status(500).json({error: "Failed to fetch lead."})
   }
})



app.listen(3000, () => {
  console.log("Server running on port 3000");
});
