import React, { useState } from "react";
import { nanoid } from "nanoid"; // Unique ID generator
import { MessageSquare } from "lucide-react"; // Icon

const Sidebar = ({ setNodes }) => {
  const [showInput, setShowInput] = useState(false); // Toggle input
  const [message, setMessage] = useState(""); // Message text

  // Add a new node to the flow
  const handleAddNode = () => {
    if (!message.trim()) return;

    const newNode = {
      id: nanoid(),
      type: "message",
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label: message },
    };

    setNodes((nds) => [...nds, newNode]); // Add node
    setMessage("");
    setShowInput(false);
  };

  return (
    <div className="mb-4">
      <h4 className="font-semibold mb-2">Nodes Panel</h4>

      <button
        onClick={() => setShowInput((prev) => !prev)}
        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded text-sm"
      >
        <MessageSquare size={16} /> Message Node
      </button>

      {showInput && (
        <div className="mt-3">
          <label className="block text-sm font-medium mb-1">Text</label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message text"
            className="w-full border border-gray-300 rounded p-2 text-sm"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAddNode}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
            >
              Add Node
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
