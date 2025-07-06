import React from "react";
import { Handle, Position } from "reactflow";

// Defines how a "message" node looks and behaves
const MessageNode = ({ data }) => {
  return (
    <div className="bg-cyan-100 border border-cyan-600 p-4 rounded-lg shadow-md min-w-[160px]">
      <div className="font-bold text-teal-800 mb-1">Send Message</div>
      <div className="text-sm text-teal-900 whitespace-pre-wrap">
        {data.label}
      </div>
      {/* Handles for edges */}
      <Handle type="source" position={Position.Right} /> {/* Outgoing edge */}
      <Handle type="target" position={Position.Left} /> {/* Incoming edge */}
    </div>
  );
};

export default MessageNode;
