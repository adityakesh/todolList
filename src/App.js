//import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function App() {

  let [todolist,saveTodolist]=useState([]);

  let saveToDoList = (event) => {
    event.preventDefault();
    let toname=event.target.toname.value;
    if(!todolist.includes(toname)){
      let finalDolist=[...todolist,toname];
      saveTodolist(finalDolist);
    }else{
      NotificationManager.info('Already Exist');
    }
  };

  let list=todolist.map((value,index)=>{
    return(
      <ToDoListItems value={value} key={index} 
      indexNumber={index} 
      todolist={todolist}
      saveToDolist={saveTodolist}
      />
    )
  })


  return (
    <div className="App">
      <h1>ToDo List</h1>
      <form onSubmit={saveToDoList}>
        <input type="text" name='toname'/> <button>Save</button>
      </form>
      <div className='outerDiv'>
        <ul>
          {list}
        </ul>
      </div>
      <NotificationContainer/>
    </div>
  );
}

export default App;

function ToDoListItems({value,indexNumber,todolist,saveToDolist}){
  let deleteRow=()=>{
    let finalData=todolist.filter((v,i)=>i != indexNumber)
    saveToDolist(finalData)
  }

  let [status,setStatus]=useState(false);

  let checkStatus=()=>{
    setStatus(!status)
  }


  return(
    <li className={(status)? 'completetodo':''} onClick={checkStatus}>
      {indexNumber+1} &nbsp;
      {value}
      <span onClick={deleteRow}>&times;</span></li>
  )
}
