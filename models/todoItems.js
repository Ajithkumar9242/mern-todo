const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    item:{
        type: String,
        reqired: true
    }
})

module.exports = mongoose.model("todo" ,todoSchema)