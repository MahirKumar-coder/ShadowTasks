import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import NewNote from './components/NewNote'
// import { v4 as uuidv4 } from 'uuid';
import emptyImage from './components/empty.svg';


function App() {


  // const [todo, setTodo] = useState("")
  const [newTask, setNewTask] = useState("")
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null)
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);



  // 1. Load todos from localStorage on first render
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    console.log("Loaded from localStorage:", savedTodos); // Debug
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // 2. Save todos to localStorage whenever they change
  useEffect(() => {
    console.log("Saving to localStorage:", todos); // Debug
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);




  // const handleApply = () => {
  //   if (newTask.trim() === "") return;


  //   if (editingIndex !== null) {
  //     // Update existing todo
  //     setTodos(prevTodos =>
  //       prevTodos.map((todo, i) =>
  //         i === editingIndex ? { ...todo, todo: newTask } : todo
  //       )
  //     );
  //     setEditingIndex(null);
  //   } else {
  //     // Add new todo
  //     setTodos(prevTodos => [...prevTodos, { todo: newTask, isCompleted: false }]);
  //   }


  //   setNewTask("");
  //   setIsDialogOpen(false);

  // };

  const toggleComplete = (index) => {
    setTodos(prevTodos =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleDelete = (index) => {
    setTodos(prevTodos => prevTodos.filter((_, i) => i !== index));
  };

  const handleApply = () => {
    if (newTask.trim() === "") return;

    if (editingIndex !== null) {
      setTodos(prev =>
        prev.map((t, i) =>
          i === editingIndex ? { ...t, todo: newTask } : t
        )
      );
      setEditingIndex(null);
    } else {
      setTodos(prev => [...prev, { todo: newTask, isCompleted: false }]);
    }

    setNewTask("");
    setIsDialogOpen(false);
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === "Complete" ? todo.isCompleted :
        filter === "Incomplete" ? !todo.isCompleted : true;
    const matchesSearch =
      todo.todo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch; // For 'All' show everything
  });

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  }

  return (
    <>
      <div
        className={`min-h-screen w-full transition-colors ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
      >
        <Navbar />
        <NewNote
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onApply={handleApply}
          newTask={newTask}      // Pass current text to modal
          setNewTask={setNewTask} // Pass setter to modal for input
        />
        <div className="container relative mx-auto">
          <div className="search flex gap-3 md: mx-2.5">
            <svg className='absolute right-60 mt-2.5' xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
              <path d="M20.7773 20.184L15.9056 15.312H15.8531C17.3547 13.5415 18.1136 11.2588 17.9709 8.94156C17.8282 6.62433 16.7951 4.45202 15.0876 2.87905C13.3801 1.30608 11.1306 0.454303 8.80958 0.501892C6.48855 0.549481 4.27583 1.49275 2.63427 3.13439C0.992706 4.77602 0.0494786 6.98885 0.00189181 9.30999C-0.045695 11.6311 0.806045 13.8808 2.37894 15.5883C3.95184 17.2958 6.12404 18.329 8.44117 18.4717C10.7583 18.6144 13.0408 17.8555 14.8113 16.3539C14.8113 16.3539 14.8113 16.3914 14.8113 16.4063L19.6831 21.2783C19.7527 21.3485 19.8356 21.4043 19.927 21.4424C20.0183 21.4804 20.1163 21.5 20.2152 21.5C20.3141 21.5 20.4121 21.4804 20.5034 21.4424C20.5948 21.4043 20.6777 21.3485 20.7473 21.2783C20.8242 21.2103 20.8862 21.1272 20.9296 21.0342C20.9731 20.9412 20.9969 20.8402 20.9997 20.7376C21.0025 20.635 20.9842 20.533 20.946 20.4377C20.9077 20.3425 20.8503 20.2561 20.7773 20.184ZM9.00276 16.9685C7.5204 16.9685 6.07133 16.5289 4.83879 15.7053C3.60625 14.8817 2.64561 13.7111 2.07833 12.3415C1.51106 10.9719 1.36263 9.46488 1.65183 8.01094C1.94102 6.55699 2.65485 5.22146 3.70303 4.17322C4.75122 3.12499 6.08669 2.41113 7.54057 2.12192C8.99445 1.83272 10.5014 1.98115 11.871 2.54845C13.2405 3.11575 14.411 4.07644 15.2346 5.30904C16.0581 6.54163 16.4977 7.99077 16.4977 9.4732C16.4977 10.4575 16.3038 11.4322 15.9272 12.3415C15.5505 13.2509 14.9985 14.0772 14.3025 14.7732C13.6065 15.4692 12.7803 16.0213 11.871 16.3979C10.9616 16.7746 9.98701 16.9685 9.00276 16.9685Z" fill="#6C63FF" />
            </svg>
            <input className='w-full border border-[#6C63FF] pl-3 p-2.5' type="text" placeholder='Search note...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />
            <label for="cars"></label>


            <select value={filter}
              onChange={(e) => setFilter(e.target.value)} className=' hover:bg-[#6C63FF] bg-[#6C63FF] text-white font-bold pl-1 pr-1 rounded-lg' name="filter" id="filter">
              <option value="All">All</option>
              <option value="Complete">Complete</option>
              <option value="Incomplete">Incomplete</option>
            </select>
            <button onClick={toggleDarkMode} className={`border-none rounded-lg text-white font-medium hover:bg-[#6C63FF] bg-[#6C63FF] pl-3 pr-3 transition-colors ${isDarkMode ? "bg-[#6C63FF] text-white" : "bg-[#6C63FF] text-black"}`}>

              <img src={isDarkMode ? "/moon.svg" : "/dark.svg"} alt="" />
            </button>
          </div>


          {todos.length === 0 && <div className='flex flex-col items-center gap-3'><img className='mx-auto mt-7' src={emptyImage} alt="" />Empty...</div>}


          {/* Checkbox */}
          {filteredTodos.map((item, index) => (
            <div key={index} className="flex items-center mt-16 ml-10 mb-3 h-full">
              <input
                type="checkbox"
                checked={item.isCompleted}
                id="myCheckbox"
                onChange={() => {
                  setTodos((prevTodos) =>
                    prevTodos.map((todo, i) =>
                      i === index
                        ? { ...todo, isCompleted: !todo.isCompleted }
                        : todo));
                }}
                className="appearance-none w-5 h-5 border border-gray-400 rounded-sm checked:bg-[#6C63FF] checked:violet-blue-600 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:ring-opacity-50"
              />
              <label htmlFor={`todo-${index}`} for="myCheckbox" className={`ml-2 font-bold ${item.isCompleted ? 'line-through text-gray-500' : 'text-gray-700'}`}>{item.todo}</label>
              {/* Add */}


              <svg onClick={() => {
                setEditingIndex(index);  // Set the index of the todo to edit
                setNewTask(item.todo);   // Pre-fill the modal input with the current todo text
                setIsDialogOpen(true);        // open the dialog
              }} className='absolute right-16' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="black">
                <path d="M8.67272 5.99106L2 12.6637V16H5.33636L12.0091 9.32736M8.67272 5.99106L11.0654 3.59837L11.0669 3.59695C11.3962 3.26759 11.5612 3.10261 11.7514 3.04082C11.9189 2.98639 12.0993 2.98639 12.2669 3.04082C12.4569 3.10257 12.6217 3.26735 12.9506 3.59625L14.4018 5.04738C14.7321 5.37769 14.8973 5.54292 14.9592 5.73337C15.0136 5.90088 15.0136 6.08133 14.9592 6.24885C14.8974 6.43916 14.7324 6.60414 14.4025 6.93398L14.4018 6.93468L12.0091 9.32736M8.67272 5.99106L12.0091 9.32736" stroke="#CDCDCD" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {/* Delete */}
              <svg onClick={() => {
                setTodos(prevTodos => prevTodos.filter((_, i) => i !== index));
              }} className='absolute right-5' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="black">
                <path d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z" stroke="#CDCDCD" />
                <path d="M14.625 3.75H3.375" stroke="#CDCDCD" stroke-linecap="round" />
                <path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z" stroke="#CDCDCD" />
                <path d="M10.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round" />
                <path d="M7.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round" />
              </svg>
            </div>
          ))}


        </div>
        <div onClick={() => setIsDialogOpen(true)} className="add absolute left-80 bottom-10 md:left-450">
          <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
            <g filter="url(#filter0_d_17_249)">
              <circle cx="29" cy="29" r="25" fill="#6C63FF" />
            </g>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M27.5 39.5C27.5 39.8978 27.658 40.2794 27.9393 40.5607C28.2206 40.842 28.6022 41 29 41C29.3978 41 29.7794 40.842 30.0607 40.5607C30.342 40.2794 30.5 39.8978 30.5 39.5V30.5H39.5C39.8978 30.5 40.2794 30.342 40.5607 30.0607C40.842 29.7794 41 29.3978 41 29C41 28.6022 40.842 28.2206 40.5607 27.9393C40.2794 27.658 39.8978 27.5 39.5 27.5H30.5V18.5C30.5 18.1022 30.342 17.7206 30.0607 17.4393C29.7794 17.158 29.3978 17 29 17C28.6022 17 28.2206 17.158 27.9393 17.4393C27.658 17.7206 27.5 18.1022 27.5 18.5V27.5H18.5C18.1022 27.5 17.7206 27.658 17.4393 27.9393C17.158 28.2206 17 28.6022 17 29C17 29.3978 17.158 29.7794 17.4393 30.0607C17.7206 30.342 18.1022 30.5 18.5 30.5H27.5V39.5Z" fill="#F7F7F7" />
            <defs>
              <filter id="filter0_d_17_249" x="0" y="0" width="58" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.423529 0 0 0 0 0.388235 0 0 0 0 1 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_17_249" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_17_249" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>

      </div>
    </>
  )
}


export default App
