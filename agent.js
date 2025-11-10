const { initializeDatabase } = require("./db/db.connect")
const Agent = require("./models/salesAgent.model")

initializeDatabase()

const express = require("express")
const app = express()

app.use(express.json())   

app.post("/agents", async (req, res) => {
  try {
    const newAgent = req.body;           
    const agent = new Agent(newAgent);  
    const savedAgent = await agent.save(); 

    res.status(201).json(savedAgent);   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/agents", async(req,res) =>{
   try{
      const agents = await Agent.find()
      res.status(200).json(agents);
   } catch(error) {
      res.status(500).json({error: "Failed to fectch movie."})
   }
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
