import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import Todo from "./Todo";
import { db } from "./firebase";
import {collection , query, onSnapshot ,updateDoc , doc ,addDoc , deleteDoc} from 'firebase/firestore'

function App() {
  const [todos , setTodos] = useState([])
  const [input , setInput] = useState('')

//create Todo
const createTodo = async(e) =>{
e.preventDefault()
if(input===''){
  alert('Enter Something')
  return
}
  await addDoc(collection(db,'todos'),{
    text: input,
    completed:false
  })
  setInput('')
}
//read todo
useEffect(() => {
  const q = query(collection(db, 'todos'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let todosArr = [];
    querySnapshot.forEach((doc) => {
      todosArr.push({ ...doc.data(), id: doc.id });
    });
    setTodos(todosArr);
  });
  return () => unsubscribe();
}, []);
//update todo

const toggleTodo =  async(todo) =>{
await updateDoc(doc(db,'todos',todo.id),{
  completed:!todo.completed
})
}

//Delete todo
const deleteTodo=async(id) => {
await deleteDoc(doc(db,'todos',id))
}



  return (
    <div className="w-screen h-screen p-4 bg-gradient-to-r from-blue-400 to-red-800 ">
      <div className=" bg-gray-300 w-full max-w-[500px] m-auto rounded-md shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 p-2 ">Todo App</h1>
      <form onSubmit={createTodo} className="flex justify-between">
        <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Enter Todo" className="border p-2 w-full text-xl" type="text" />
      <button className="border p-4 ml-2 bg-blue-500 text-gray-100"> <IoMdAddCircle size={30} /></button> 
      </form>
      <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todos={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      <p className="text-2xl ml-7">You have {todos.length} task left</p>
        </div>
    </div>
  );
}

export default App;
