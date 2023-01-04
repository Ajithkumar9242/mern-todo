const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 4000
const cors = require("cors")
const TodoitemRoute = require("./routes/todoItems")


const app = express()

app.use(express.json())
app.use(cors())


mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log("CONNECTED SUCCESSFULLY"))
.catch(err => console.log(err))


app.use("/" , TodoitemRoute)

app.listen(PORT, () =>{

    console.log(`Server started  at ${PORT}`);

})