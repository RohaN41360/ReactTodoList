import React, { useEffect, useState } from 'react'


// getting the localStorage data back 

const getLocalData= () =>{
    const lists= localStorage.getItem("mytodolist") 
    if(lists){
        return JSON.parse(lists)    // parse converts strings to array format
    }
    else{
        return []  
    }
}
const Todolist = () => {
    const [inputdata,setInputdata] = useState("")
    const [items,setItems] = useState(getLocalData())
    const [toggle,settoggle] = useState(true)
    const [isEditItem,setIsEditItem] = useState(null)

    // adding the items here
    const AddItem = () =>{
        if(!inputdata)
        {
            alert("please Enter in the input box")
        }
        else if(inputdata && !toggle)
        {
            setItems(
                items.map((elem) =>{
                    if(elem.id === isEditItem)
                    {
                        return {...elem,name:inputdata}
                    }
                    return elem;
                })
            )
            setInputdata("")
            settoggle(true)
            setIsEditItem(null)
        }
        else
        {
            const newInputData = {
                id:new Date().getTime().toString(),
                name:inputdata
            }
            setItems([...items,newInputData])     
            // ...items ==> means that whatever data is in items previously it should be as it is and add inputdata  to it
            setInputdata("")
        }
    };

    // delete the items
    const deleteItem = (index) =>{  
        const updatedItems = items.filter((CurEle) =>{
            return CurEle.id !== index
        });
        setItems(updatedItems)
    }

    // edit the item
    const editItem = (id) =>{
        let newEditItem = items.find((elem)=>{
            return elem.id === id;
        })
        settoggle(false);
        setInputdata(newEditItem.name);
        setIsEditItem(id);
        
        console.log(newEditItem);
    }



    // remove all the items 
    const RemoveAllItems = () =>{
        setItems([])
    }

    // add the items to the localStorage
    useEffect(()=>{
        localStorage.setItem("mytodolist",JSON.stringify(items));  
        // adding items to localstorage 
        // setitem adds to the localstorage i.e key and value pair
        //it requires to be in the string format that is why json.stringify
    },[items])    



  return (  
    <div className='container'>
        <h3 className='text-center text-warning'>ToDo List</h3>
        <div class="input-group mb-3">
            <input type="text" class="form-control" value={inputdata} onChange={(e)=>{setInputdata(e.target.value)}} placeholder=" Add Something clever.."/>
                <div class="input-group-append">
                    {
                       toggle ? <button class="btn btn-success" type="button" onClick={AddItem}>Add Item</button>
                       : <button class="btn btn-primary" type="button" onClick={AddItem}>Edit Item</button>
                    }
                </div>
        </div>

        <div class="container">
  <h2 className='text-primary'>Below is the Your ToDO List</h2>
  <ul className="list-group">
     
      {items.map((CurEle) =>{
          
          return(
    
    <ul key={CurEle.id} class="list-group">
        <li   className="list-group-item list-group-item-success mb-2 text-dark  d-flex justify-content-between">
            {CurEle.name}
            <div className=' d-flex justify-content-between '>
                <i className='far fa-edit add-btn ml-3 text-primary' onClick={()=>editItem(CurEle.id)}></i>
                <i className='far fa-trash-alt add-btn ml-3 text-danger  ' onClick={()=>deleteItem(CurEle.id)}></i>
            </div>
        </li>
        
    </ul>
                )
})}
    
    
  </ul>
</div>

    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <button type="button" className="btn btn-primary" onClick={RemoveAllItems}>Remove All</button>
    </div>

    </div>
  )
}

export default Todolist