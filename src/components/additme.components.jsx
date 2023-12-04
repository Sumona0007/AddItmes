import React, { useState, useEffect } from "react";

const getLocalItems = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, settoggleSubmit] = useState(true);
  const[isEditItem ,setisditItem]=useState(null);

  const addItem = () => {
    if (!inputData) {
      alert('please fill the column')
    } 
    else if(!toggleSubmit && inputData){
      setItems( items.map(elem=>{
        if(elem.id===isEditItem){
            return {...elem , name:inputData}
        }
        return elem;
       }))
       settoggleSubmit(true);
    setItems('');
    setisditItem(null);
      
    }
    else {
      const allInptData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInptData]);
      setInputData("");
      console.log('hello');
    }
  };

  const deletItem = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updatedItems);
  };

  const editItem = (id) => {
    let newEdit = items.find((elem) => {
      return elem.id === id;
    }
    );
    settoggleSubmit(false);
    setItems(newEdit.name);
    setisditItem(id);
  };


  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleSubmit ? (
              <i class="bi bi-plus" title="Add Item" onClick={addItem} />
            ) : (
              <i className="bi bi-pencil-square" title="Update Item" onClick={addItem} />
            )}
           
          </div>
          <div className="showItems">
            {items.map((elem) => (
              <div className="eachItem" key={elem.id}>
                <h3>{elem.name}</h3>
                <div className="todo-btn">
                  <i
                    className="bi bi-pencil-square"
                    title="Edit Item"
                    onClick={() => editItem(elem.id)}
                  />
                  <i
                    className="bi bi-trash3"
                    title="Delete Item"
                    onClick={() => deletItem(elem.id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              title="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Todo;
