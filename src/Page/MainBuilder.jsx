// Import required hooks and components
import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow"; // Importing core React Flow components
import "reactflow/dist/style.css"; // React Flow default styles

import MessageNode from "../components/MessageNode"; // Custom node type
import Sidebar from "../components/Sidebar"; // Sidebar for adding nodes
import SettingsPanel from "../components/SettingsPanel"; // Right panel for editing node text

// Define node types mapping
const nodeTypes = {
  message: MessageNode,
};

const FLOW_KEY = "chatbot-flow"; // Key for localStorage

export default function MainBuilder() {
  // Manage nodes and edges using React Flow hooks
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // States for editing a selected node
  const [selectedNode, setSelectedNode] = useState(null);
  const [edit, setedit] = useState(false);

  // State for Error handling
  const [textError, setError] = useState("");

  // Load flow from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem(FLOW_KEY);
    if (stored) {
      const { nodes, edges } = JSON.parse(stored);
      setNodes(nodes);
      setEdges(edges);
    }
  }, []);

  // Handles connection between nodes
  const onConnect = useCallback(
    (params) => {
      // Allow only one outgoing edge per node
      const alreadyConnected = edges.find((e) => e.source === params.source);
      if (alreadyConnected) {
        alert("Only one outgoing connection allowed");
        return;
      }
      setEdges((eds) => addEdge(params, eds)); // Add new edge
    },
    [edges, setEdges]
  );

  // When a node is clicked, open settings panel
  const handleNodeClick = (_event, node) => {
    setSelectedNode(node);
    setedit(true);
  };

  // Update the label of a node
  const updateNodeText = (id, text) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label: text } } : node
      )
    );
    setSelectedNode((prev) =>
      prev && prev.id === id
        ? { ...prev, data: { ...prev.data, label: text } }
        : prev
    );
  };

 
  const handleSave = () => {
    // Get all connected node IDs (both source and target)
    const connectedNodeIds = new Set();

    edges.forEach((edge) => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    // Find unconnected nodes (i.e., not in edges)
    const unconnectedNodes = nodes.filter(
      (node) => !connectedNodeIds.has(node.id)
    );

    if (unconnectedNodes.length > 0) {
      setError("❌ Cannot save.");
      // alert("Cannot save Flow: nodes are unconnected.");
      return;
    }
    else{
      setError("");
    localStorage.setItem(FLOW_KEY, JSON.stringify({ nodes, edges }));
      alert("Flow Saved!")
    }
    setError("");
    // Save if all nodes are connected
    // localStorage.setItem(FLOW_KEY, JSON.stringify({ nodes, edges }));
    // alert("Flow saved to localStorage!");
    // alert("Flow Saved!");
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Flow Canvas */}

      <div className="flex-1 bg-gray-100 py-1" >
        {textError && (
          <div className="text-center bg-red-200 rounded w-64 m-auto text-red-600 font-medium py-1">
            {textError}
          </div>
        )}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          fitView
        >
          {/* UI Add-ons */}
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      {/* Right Side Panel */}
      <div className="w-80 p-4 bg-white border-l border-gray-300 flex flex-col justify-between">
        {selectedNode && edit ? (
          <SettingsPanel
            node={selectedNode}
            onChange={updateNodeText}
            setedit={setedit}
          />
        ) : (
          <Sidebar setNodes={setNodes} />
        )}
        <button
          onClick={handleSave}
          className="px-4 py-3 bg-blue-600 text-white font-bold rounded mt-4"
        >
          💾 Save Flow
        </button>
      </div>
    </div>
  );
}
 // Save flow to localStorage with validation
  // const handleSave = () => {
  //   const targetIds = edges.map(edge => edge.target);

  //   // Find nodes with no incoming edges
  //   const nodesWithoutIncoming = nodes.filter(node => !targetIds.includes(node.id));

  //   // Validate: Only one unconnected (start) node is allowed
  //   if (nodes.length > 1 && nodesWithoutIncoming.length > 1) {
  //     alert("Cannot save Flow: Multiple nodes are unconnected (have no incoming edge).");
  //     return;
  //   }

  //   // Save nodes and edges in localStorage
  //   localStorage.setItem(FLOW_KEY, JSON.stringify({ nodes, edges }));
  //   alert("Flow saved to localStorage!");
  // };
