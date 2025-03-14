const express = require('express'); 
const app = express(); 
const {connectToDb, isConnected} = require('./config/db')
const careerRouter = require("./routes/careerRoutes")
const cors = require("cors")

connectToDb()
app.use(express.json())
app.use(cors())

app.get("/" , (req , res)=>{
    res.json({"Database" : `${isConnected() ? "Connected" : "Not Connected"}`})
})

app.use("/careers", careerRouter)

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
})

