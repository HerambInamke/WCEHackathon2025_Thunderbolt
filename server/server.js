const express = require('express'); 
const app = express(); 
const {connectToDb, isConnected} = require('./config/db')
const careerRouter = require("./routes/careerRoutes")
const userRoutes = require("./routes/userRoutes")
const bookmarkRoutes = require("./routes/bookmarkRoutes")
const cors = require("cors")

connectToDb()
app.use(express.json())
app.use(cors())

app.get("/" , (req , res)=>{
    res.json({"Database" : `${isConnected() ? "Connected" : "Not Connected"}`})
})

app.use("/careers", careerRouter)
app.use("/api/users", userRoutes);
app.use("/bookmark", bookmarkRoutes)
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
})

