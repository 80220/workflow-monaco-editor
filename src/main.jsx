import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NodeConfigEditor from "./widgets/NodeConfigEditor";
import JavascriptEditor from "./widgets/JavascriptEditor";
import "./main.css";
import jsonSchema from "./test/data/input-schema.json";

const autosuggestions = [
  {
    label: "@global.request-proxy-1",
    insertText: "@global.request-proxy-1",
    documentation: "Request Proxy 1",
  },
  {
    label: "@task.123.output",
    insertText: "@task.123.output",
    documentation: "Output of task 123",
  },
  {
    label: "@task.567.output",
    insertText: "@task.567.output",
    documentation: "Output of task 567",
  },
];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NodeConfigEditor height="600px" width="800px" schema={jsonSchema} autosuggestions={autosuggestions} />;
  </StrictMode>,
)
