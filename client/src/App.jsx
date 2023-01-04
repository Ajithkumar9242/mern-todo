import { React, useState, useEffect} from 'react'
import axios from 'axios'

function App() {

  const [itemText, setItemText] = useState("")
  const [listItems, setListItems] = useState([])
  const [isupdating, setIsupdating] = useState('')
  const [updateItemText, setUpdateItemText] = useState('')



  


    const addItem = async (e) =>{
      e.preventDefault()
      try {
        const res = await axios.post("http://localhost:4000/api/item", {item: itemText})
        console.log(res.data);
        setListItems(prev => [...prev, res.data])
        setItemText("")
      } catch (error) {
        console.log(err);
      }
    }
  

    useEffect(() => {
      const getItemsList = async () =>{
       try {
        const res = await axios.get("http://localhost:4000/api/items")
        console.log(res.data);
        setListItems(res.data)
       } catch (error) {
        console.log(err);
       }
      }
    
      getItemsList()
    }, [])

    const deleteItem = async (id) =>{
      
      try {
        const res = await axios.delete(`http://localhost:4000/api/item/${id}`)
        const newListItems = listItems.filter(item => item._id !== id)
        setListItems(newListItems)
      } catch (error) {
        console.log(err);
      }
    }

    const updateItem = async (e) =>{
      e.preventDefault()
      
      try {
        const res = await axios.put(`http://localhost:4000/api/item/${isupdating}`, {item: updateItemText})
        setUpdateItemText("")
        setIsupdating('')
        console.log(res.data);
      } catch (error) {
        console.log(err);
      }
    }

    const renderUpdate = () =>{
      <form className='update-form' onSubmit={(e) =>{updateItem(e)}}>
      <input type="text" name="item-update" placeholder='Update Items' className='input' onChange={e => {setUpdateItemText(e.target.value)}} value={updateItemText} />
       <button className='update' type="submit">Update</button>
      </form>
    }


  return (
    <div>
      <form onSubmit={e => addItem(e)} >
        <input type="text" name="item" placeholder='Add Items' onChange={e => {setItemText(e.target.value)}} value={itemText} className='input' />
        <button type="submit">ADD</button>
      </form>


      <div className="todo-list">
      {
        listItems.map(item =>(
          <div className="todoitem">

          {
            isupdating === item._id ? renderUpdate() :
            <>

          <p className='item' key={item}>{ item.item }</p>
          <button className='update' onClick={() => {setIsupdating(item._id)}}>Update</button>
          <button className='delete' onClick={() =>{deleteItem(item._id)}}>Delete</button>

          </>
          }
        </div>
        ))
      }
      </div>
    </div>
  )
}

export default App