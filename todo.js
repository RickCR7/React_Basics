import React, { useEffect, useState } from 'react';
import './style.css';

// get the local storage data back
const getLocalData = () => {
    const lists = localStorage.getItem("mylist");

    if(lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
}

const Todo = () => {

    const [inputdata,setInputData] = React.useState("");
    const [items,setItems] = React.useState(getLocalData());
    const [isEditItem,setIsEditItem] = useState("");
    const [toggleButton,setToggleButton] = useState(false);

    // add the items functions
    const addItem = () =>{
        if(!inputdata){
            alert("please fill the data");
        } else if (inputdata && toggleButton){
            setItems(
                items.map((currElem)=>{
                    if(currElem.id === isEditItem){
                        return{...currElem,name:inputdata};
                    }
                    return currElem;
                })
            );
            setInputData([]);
            setIsEditItem(null);
            setToggleButton(false);
        }
         else {
            const myNewInputData = {
                id:new Date().getTime().toString(),
                name : inputdata
            }
            setItems([...items,myNewInputData]);
            setInputData("");
        }
    }

    // edit the items
    const editItem = (index) => {
        const item_todo_edited = items.find((currElem)=>{
            return currElem.id === index;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    }

    // how to delete items
    const deleteItem = (index)=>{
        const updatedItem = items.filter((currElem)=>{
            return currElem.id !== index;
        });
        setItems(updatedItem);
    }

    // remove all the items
    const removeAll = () =>{
        setItems([]);
    }

    // adding localStorage
    useEffect(() => {
        localStorage.setItem("mylist",JSON.stringify(items));
    },[items]);


  return (
    <>
    <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="./images/todo.png" alt="images" />
                <figcaption>Add Your Lists Here</figcaption>
            </figure>
            <div className="addItems">
                <input type="text" placeholder='✍️ Add Items' 
                className='form-control' 
                value={inputdata} 
                onChange={(event) => setInputData(event.target.value)}/>
                {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>
                ) : (<i className="fa fa-plus add-btn" onClick={addItem}></i>

                )}
                
            </div>
            {/* show our items */}
            <div className="showItems">
                {items.map((currElem,index)=>{
                    return (
                        <div className="eachItem" key={currElem.id}>
                        <h3>{currElem.name}</h3>
                        <div className="todo-btn">
                        <i className="far fa-edit add-btn" onClick={()=>editItem(currElem.id)}></i>
                        <i className="far fa-trash-alt add-btn" onClick={()=>
                            deleteItem(currElem.id)
                        }></i>
                        </div>
                        </div>
                    )
                })}
                
            </div>
                {/* remove all button */}
            <div className="show-items">
                <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll} >
                    <span>CHECK LIST</span>
                </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Todo