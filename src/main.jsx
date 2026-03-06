import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NodeConfigEditor from "./widgets/NodeConfigEditor";
import JavascriptEditor from "./widgets/JavascriptEditor";
import JobExecutionLogger from "./widgets/JobExecutionLogger";
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

export const App = () => {
  const [activeTab, setActiveTab] = useState('NodeConfigEditor');

  return (
    <div className="app-container">
      <div className="tabs">
        <button
          className={activeTab === 'NodeConfigEditor' ? 'active' : ''}
          onClick={() => setActiveTab('NodeConfigEditor')}
        >
          NodeConfigEditor
        </button>
        <button
          className={activeTab === 'JavascriptEditor' ? 'active' : ''}
          onClick={() => setActiveTab('JavascriptEditor')}
        >
          JavascriptEditor
        </button>
        <button
          className={activeTab === 'JobExecutionLogger' ? 'active' : ''}
          onClick={() => setActiveTab('JobExecutionLogger')}
        >
          JobExecutionLogger
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'NodeConfigEditor' && (
          <NodeConfigEditor
            height="600px"
            width="800px"
            schema={jsonSchema}
            autosuggestions={autosuggestions}
          />
        )}
        {activeTab === 'JavascriptEditor' && (
          <JavascriptEditor height="600px" width="800px" />
        )}
        {activeTab === 'JobExecutionLogger' && <JobExecutionLogger />}
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
