const router = require("express").Router()

const todoItemModel = require("../models/todoItems")


router.post("/api/item", async (req,res) =>{
    try {
        const newItem = new todoItemModel({
            item: req.body.item
        })

        const saveItem = await newItem.save()
        res.send(saveItem)
        console.log("ITEM ADDED");

    } catch (error) {
        res.json(error)
    }
})


router.get("/api/items", async (req,res) =>{
    try {

        const allToDoItems = await todoItemModel.find({})
        console.log(allToDoItems);
        res.send(allToDoItems)

    } catch (error) {
        res.json(error)
    }
})

router.put("/api/item/:id", async (req,res) =>{
    try {
        

        const updateItem = await todoItemModel.findByIdAndUpdate(req.params.id, {$set: req.body})
        console.log("ITEM UPDATED");
        res.send(updateItem)

    } catch (error) {
        res.json(error)
    }
})

router.delete("/api/item/:id", async (req,res) =>{
    try {
       
        const deleteItem = await todoItemModel.findByIdAndDelete(req.params.id)
        res.send(deleteItem)
        console.log("ITEM DELETED");

    } catch (error) {
        res.json(error)
    }
})

module.exports = router