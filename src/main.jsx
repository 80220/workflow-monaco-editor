import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NodeConfigEditor from "./widgets/NodeConfigEditor";
import JavascriptEditor from "./widgets/JavascriptEditor";
import "./main.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NodeConfigEditor height="600px" width="800px"/>;
  </StrictMode>,
)
