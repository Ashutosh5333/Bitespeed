import React, { useState } from "react";

const SettingsPanel = ({ node, onChange, setedit }) => {
  const [editedText, setEditedText] = useState(node.data.label);

  const handleSave = () => {
    if (editedText.trim()) {
      onChange(node.id, editedText); // Update label
      setedit(false); // Close editor
    }
  };

  return (
    <div className="mb-4">
      <h4 className="font-semibold mb-2">Edit Message</h4>
      <textarea
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded resize-none text-sm"
        rows={4}
      />
      <button
        onClick={handleSave}
        className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded text-sm"
      >
        Done Editing
      </button>
    </div>
  );
};

export default SettingsPanel;
