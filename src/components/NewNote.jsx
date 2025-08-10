import React, {  } from 'react'

const NewNote = ({ isOpen, onClose, onApply, newTask, setNewTask }) => {
    // const [noteText, setNoteText] = useState("");

    if (!isOpen) return null;

    return (
        // <!-- Overlay with blur effect -->
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
            {/* <!-- Modal dialog box --> */}
            <div className="bg-white rounded-2xl shadow-lg p-7 w-96">
                <h2 className="text-lg font-semibold text-center mb-4">NEW NOTE</h2>
                <input
                    type="text"
                    placeholder="Input your note..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="w-full border border-[#6C63FF] rounded-md p-2 text-[#6C63FF] mb-6 outline-none"
                />
                <div className="flex justify-between mt-4">
                    <button onClick={() => {
                        setNewTask("");
                        onClose();
                    }
                    } className="border border-[#6C63FF] text-[#6C63FF] rounded-md px-6 py-2 hover:bg-purple-50">CANCEL</button>
                    <button onClick={onApply} className="bg-[#6C63FF] text-white rounded-md px-7 py-2 font-semibold hover:bg-[#6C63FF] ">APPLY</button>
                </div>
            </div>
        </div>


    )
}

export default NewNote

