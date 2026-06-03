import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { db, auth } from "./firebase";
import UserLogin from "./components/Button";
import Todo from "./Todo";

function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "todos")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const arr = [];

      snapshot.forEach((doc) => {
        arr.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setTodos(arr);
    });

    return () => unsubscribe();
  }, [user]);

  const createTodo = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    await addDoc(
      collection(db, "users", user.uid, "todos"),
      {
        text: input,
        completed: false,
      }
    );

    setInput("");
  };

  const toggleTodo = async (todo) => {
    await updateDoc(
      doc(db, "users", user.uid, "todos", todo.id),
      {
        completed: !todo.completed,
      }
    );
  };

  const deleteTodoHandler = async (id) => {
    await deleteDoc(
      doc(db, "users", user.uid, "todos", id)
    );
  };

  if (!user) {
    return <UserLogin />;
  }

  return (
    <div className="w-screen h-screen p-4 bg-gradient-to-r from-blue-400 to-red-800">
      <div className="bg-gray-300 w-full max-w-[500px] m-auto rounded-md shadow-xl">

        <div className="flex items-center gap-3 p-4">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-12 h-12 rounded-full"
          />

          <h2 className="font-bold">
            {user.displayName}
          </h2>
        </div>

        <h1 className="text-3xl font-bold text-center p-2">
          Todo App
        </h1>

        <form
          onSubmit={createTodo}
          className="flex justify-between"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Todo"
            className="border p-2 w-full text-xl"
          />

          <button className="border p-4 ml-2 bg-blue-500 text-white">
            <IoMdAddCircle size={30} />
          </button>
        </form>

        <ul>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todos={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodoHandler}
            />
          ))}
        </ul>

        <p className="text-2xl ml-7 pb-4">
          You have {todos.length} task left
        </p>
      </div>
    </div>
  );
}

export default App;