import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import { CircleX } from "lucide-react";

import "./style.css";

import useStore from "../zustand/usestore";
import LeadNOde from "../CustomNodes/LeadNOde";
import WaitNode from "../CustomNodes/WaitNode";
import StartNode from "../CustomNodes/StartNode";
import EmailNode from "../CustomNodes/EmailNode";
import EndNode from "../CustomNodes/EndNode";
import Sidebar from "../components/Sidebar";

const nodeTypes = {
  LeadNOde: LeadNOde,
  WaitNode: WaitNode,
  StartNode: StartNode,
  EmailNode: EmailNode,
  EndNode: EndNode,
};

import { initialNodes } from "../Constants/Constants";
import axios from "axios";
let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const { isOpen, setOpenTrue, setOpenFalse } = useStore();
  console.log(isOpen);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  //update Node
  const [editValue, setEditValue] = useState(nodes.data);
  const [id, setId] = useState();
  const [clickedNodeType, setclickedNodeType] = useState(null);

  //edit function
  const onNodeClick = (e) => {
    const clickedNode = e;
    const nodeId = clickedNode.id;
    const nodeType = clickedNode.type;
    const nodeData = clickedNode.data;
    setclickedNodeType(nodeType);
    console.log(clickedNodeType);

    let editableData;
    if (nodeType === "EmailNode") {
      editableData = {
        label: nodeData.label,
        EmailTemplate: nodeData.EmailTemplate,
        Emailcontent: nodeData.Emailcontent,
        Emailsubject: nodeData.Emailsubject,
        Recipients: nodeData.Recipients,
      };
    } else if (nodeType === "WaitNode") {
      editableData = {
        label: nodeData.label,
        time: nodeData.time, // Assuming there's a time field for WaitNode
      };
    } else if (nodeType === "LeadNOde") {
      editableData = {
        label: nodeData.label,
        source: nodeData.source, // Assuming there's a source field for WaitNode
      };
    }

    console.log(editableData);
    // Add similar logic for other node types

    setEditValue(editableData); // Set editable data based on node type
    setId(nodeId);
    setOpenTrue();
  };

  //handle Change
  const handleChange = (e) => {
    e.preventDefault();
    // Update editValue directly based on target name and value
    setEditValue({ ...editValue, [e.target.name]: e.target.value });
    console.log(editValue, "ithan values");
  };
  //handle Function
  const handleEdit = () => {
    console.log(editValue, "i am ready to save");
    const updatedNodes = nodes.map((item) => {
      if (item.id === id) {
        const updatedData = { ...item.data }; // Create a copy of existing data

        if (clickedNodeType === "EmailNode") {
          updatedData.label = editValue.label;
          updatedData.EmailTemplate = editValue.EmailTemplate;
          updatedData.Emailcontent = editValue.Emailcontent;
          updatedData.Emailsubject = editValue.Emailsubject;
          updatedData.Recipients = editValue.Recipients;
        } else if (clickedNodeType === "WaitNode") {
          updatedData.label = editValue.label;
          updatedData.time = editValue.time;
        } else if (clickedNodeType === "LeadNOde") {
          updatedData.label = editValue.label;
          updatedData.source = editValue.source;
        }

        return {
          ...item,
          data: updatedData,
        };
      }
      return item;
    });
    console.log(updatedNodes);
    setNodes(updatedNodes);
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const [data, setdata] = useState({});
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      console.log(type, "ithanu type");
      // check if the dropped element is valid

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      if (type == "EmailNode") {
        const data = {
          label: "Email node",
          EmailTemplate: "Signal_fundraise_template",
          Emailcontent: "content",
          Emailsubject: "subject",
          Recipients: "neil",
        };
        setdata(data);
        // console.log(data);
        console.log(data);
        const newEmailNode = {
          id: getId(),
          type,
          position,
          data: data,
        };
        setNodes((nds) => nds.concat(newEmailNode));
      }
      if (type == "WaitNode") {
        const data = {
          label: "Delay ",
          time: "3 hours",
        };
        setdata(data);
        console.log(data);
        const newWaitNode = {
          id: getId(),
          type,
          position,
          data: data,
        };
        setNodes((nds) => nds.concat(newWaitNode));
      }
      if (type == "LeadNOde") {
        const data = {
          label: "Leads Node",
          source: "Sample list of all sources",
        };
        setdata(data);
        console.log(data);
        console.log(data);
        const newLeadNode = {
          id: getId(),
          type,
          position,
          data: data,
        };
        setNodes((nds) => nds.concat(newLeadNode));
      }

      console.log(data);
    },
    [reactFlowInstance]
  );

  const closedrawer = () => {
    setOpenFalse();
    console.log(isOpen);
  };
  const flowKey = "example-flow";

  const [sendData, setsendData] = useState({})
  const onSave = useCallback( async() => {
    console.log("saving");
    const flowData = {
      nodes,
      edges,
    };

    setsendData( JSON.stringify(flowData))
    console.log(sendData,"here i am");
    localStorage.setItem(flowKey, JSON.stringify(flowData));

    console.log(flowData);


    const response =  await axios
      .post("/api/addseqence", flowData)
      .then((res) => {
        console.log("adding sequnce to data base is successful");
      })
      .catch((err) => {
        console.log(err);
        console.log("adding sequnce to data base failed");
      });

    window.alert("saved ");
  }, [nodes, edges]);
  const onRestore = useCallback(async () => {
    const storedFlow = localStorage.getItem(flowKey);

    if (storedFlow) {
      try {
        const flowData = JSON.parse(storedFlow);
        setNodes(flowData.nodes || []);
        setEdges(flowData.edges || []);
        console.log("Flow restored successfully!");
        window.alert("Restored  from localstorage");
      } catch (error) {
        console.error("Error restoring flow:", error);
      }
    } else {
      console.log("No flow data found in localStorage.");
    }
  }, [setNodes, setEdges]);
  // console.log(nodes, "current nodes ");
  return (
    <div className="dndflow overflow-hidden">
      {isOpen ? (
        <div className="updatenode__controls overflow-y-scroll">
          <button
            className="absolute right-5 font-bold text-3xl text-white"
            onClick={closedrawer}
          >
            <CircleX />
          </button>
          <h1 className="text-white text-2xl uppercase font-bold">Actions</h1>
          <br />
          <h1 className="text-white font-bold">{clickedNodeType} </h1>
          <br />
          {clickedNodeType === "EmailNode" && (
            <>
              <div className=" flex flex-col ">
                <span className="text-white text-sm">label</span>
                <input
                  className="rounded-md p-5"
                  type="text"
                  value={editValue.label}
                  onChange={handleChange}
                  placeholder="Lable Node"
                  name="label"
                />{" "}
                <br />
                <span className="text-white text-sm">Add recipient email</span>
                <input
                  className="rounded-md p-5"
                  type="text"
                  value={editValue.Recipients}
                  onChange={handleChange}
                  placeholder="Add recipient"
                  name="Recipients"
                />{" "}
                <br />
                <span className="text-white text-sm">Edit email subject</span>
                <input
                  className="rounded-md p-5"
                  type="text"
                  value={editValue.Emailsubject}
                  onChange={handleChange}
                  placeholder="Enter Subject"
                  name="Emailsubject"
                />{" "}
                <br />
                <span className="text-white text-sm">Choose template</span>
                <select
                  className="rounded-md p-5 text-black"
                  value={editValue.EmailTemplate}
                  onChange={handleChange}
                  name="EmailTemplate"
                >
                  <option value="Signal_fundraise_template">
                    Signal_fundraise_template
                  </option>
                  <option value="thank_you">Thank you mail</option>
                  <option value="Welcome_email">Welcome_email</option>
                </select>
                <span className="text-white text-sm">Edit email content</span>
                <textarea
                  className="rounded-md p-5"
                  type="text"
                  name="Emailcontent"
                  value={editValue.Emailcontent}
                  onChange={handleChange}
                  placeholder="Enter email body...."
                />{" "}
                <br />
              </div>
            </>
          )}
          {clickedNodeType === "WaitNode" && (
            <>
              <input
                type="text"
                value={editValue.label}
                onChange={handleChange}
                placeholder="Label"
                name="label"
              />{" "}
              <br />
              <input
                type="text"
                value={editValue.time}
                onChange={handleChange}
                placeholder="time"
                name="time"
              />{" "}
              <br />
            </>
          )}
          {clickedNodeType === "LeadNOde" && (
            <>
              <input
                type="text"
                value={editValue.label}
                onChange={handleChange}
                placeholder="label"
                name="label"
              />{" "}
              <br />
              <input
                type="text"
                value={editValue.source}
                onChange={handleChange}
                placeholder="source"
                name="source"
              />{" "}
              <br />
            </>
          )}
          <button onClick={handleEdit} className="btn">
            Update
          </button>
        </div>
      ) : null}

      <ReactFlowProvider>
        <div
          className="reactflow-wrapper bg-black"
          ref={reactFlowWrapper}
          style={{ width: "800px", height: "100vh" }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={(e, node) => onNodeClick(node)}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
            <Panel position="top-right">
              <button
                className="bg-zinc-300 p-3 rounded-md mr-3 hover:bg-white"
                onClick={onSave}
              >
                save
              </button>
              <button
                className="bg-zinc-300 p-3 rounded-md hover:bg-white"
                onClick={onRestore}
              >
                restore
              </button>
            </Panel>
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
