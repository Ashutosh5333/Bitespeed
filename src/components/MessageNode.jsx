import { MessageCircleMore } from "lucide-react";
import React from "react";
import { Handle, Position } from "reactflow";

// Defines how a "message" node looks and behaves
const MessageNode = ({ data }) => {
  return (
    <div className=" bg-white  rounded-lg shadow-md min-w-[160px]">
      {/*  heading */}
      <div className="flex items-center gap-1 mb-2 text-teal-800 bg-cyan-100 text-xs p-1 rounded-t  font-semibold">
        <MessageCircleMore size={12} className="text-teal-800" />
        <span className="text-[0.5rem] tracking-wide">Send Message</span>
      </div>
      {/*  label  message */}
      <div className="text-[0.5rem] text-teal-900 whitespace-pre-wrap px-2 pb-2">
        {data.label}
      </div>
      {/* Handles for edges */}
      <Handle type="source" position={Position.Right} /> {/* Outgoing edge */}
      <Handle type="target" position={Position.Left} /> {/* Incoming edge */}
    </div>
  );
};

export default MessageNode;
